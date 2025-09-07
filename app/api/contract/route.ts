import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer'

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      nombre, 
      apellidos, 
      telefono, 
      email, 
      codigoPostal, 
      direccion, 
      comentarios,
      productId,
      productName,
      source,
      timestamp 
    } = body

    // Email de destino (por defecto o desde admin)
    const destinationEmail = process.env.ADMIN_EMAIL || 'clientes@prismamovil.es'

    const subject = `Nueva solicitud de contratación - ${productName}`
    const emailContent = `
      <h2>Nueva solicitud de contratación</h2>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #28a745; margin: 0 0 15px 0;">🎯 Producto: ${productName}</h3>
        <p><strong>Origen:</strong> ${source === 'hero_click' ? 'Clic en Hero Principal' : source}</p>
        <p><strong>ID Producto:</strong> ${productId}</p>
      </div>
      
      <h3>Datos del cliente:</h3>
      <table style="border-collapse: collapse; width: 100%; margin: 15px 0;">
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; font-weight: bold;">Nombre completo:</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${nombre} ${apellidos}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; font-weight: bold;">Teléfono:</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${telefono}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; font-weight: bold;">Email:</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; font-weight: bold;">Código Postal:</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${codigoPostal}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; font-weight: bold;">Dirección:</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${direccion}</td>
        </tr>
        ${comentarios ? `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; font-weight: bold;">Comentarios:</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${comentarios}</td>
        </tr>
        ` : ''}
      </table>
      
      <p><strong>Fecha:</strong> ${new Date(timestamp).toLocaleString('es-ES')}</p>
      
      <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0; color: #856404;"><strong>⚡ ACCIÓN REQUERIDA:</strong> Cliente interesado en contratación. Contactar prioritario.</p>
      </div>
    `
    
    // Guardar como lead con alta prioridad
    await prisma.lead.create({
      data: {
        name: `${nombre} ${apellidos}`,
        email,
        phone: telefono,
        page: 'home',
        message: `CONTRATACIÓN ${productName} - CP: ${codigoPostal}, Dirección: ${direccion}${comentarios ? `, Comentarios: ${comentarios}` : ''}`,
      }
    })

    // Enviar email
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Prisma Móvil Web" <${process.env.SMTP_USER}>`,
      to: destinationEmail,
      subject,
      html: emailContent,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      message: 'Solicitud de contratación procesada correctamente',
      productId,
      productName,
      saved: true
    })

  } catch (error) {
    console.error('Error procesando solicitud de contratación:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
