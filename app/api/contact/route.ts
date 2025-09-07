import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

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
    
    // Nuevo formato para formulario de empresa
    if (body.nombreEmpresa && body.source) {
      const { nombreEmpresa, nombre, apellidos, cargo, telefono, email, interes, source, timestamp } = body

      // Email de destino (por defecto o desde admin)
      const destinationEmail = process.env.ADMIN_EMAIL || 'clientes@prismamovil.es'

      const subject = `🚀 Nueva Solicitud Empresarial - ${nombreEmpresa} (${source})`
      
      const emailContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva Solicitud de Contacto - Prisma Móvil</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; }
        .content { padding: 30px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #10b981; font-size: 18px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .info-item { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; }
        .info-label { font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 5px; }
        .info-value { color: #1f2937; font-size: 16px; }
        .full-width { grid-column: 1 / -1; }
        .source-badge { background: #dbeafe; color: #1e40af; padding: 8px 12px; border-radius: 20px; font-size: 14px; font-weight: 500; display: inline-block; margin-top: 10px; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
        .timestamp { color: #9ca3af; font-size: 12px; font-style: italic; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Nueva Solicitud de Contacto</h1>
            <p>Un cliente potencial está interesado en nuestras soluciones</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>🏢 Información de la Empresa</h2>
                <div class="info-grid">
                    <div class="info-item full-width">
                        <div class="info-label">Empresa</div>
                        <div class="info-value">${nombreEmpresa}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>👤 Contacto</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Nombre Completo</div>
                        <div class="info-value">${nombre} ${apellidos}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Cargo</div>
                        <div class="info-value">${cargo}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Teléfono</div>
                        <div class="info-value">${telefono}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email</div>
                        <div class="info-value">${email}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>💡 Proyecto e Interés</h2>
                <div class="info-grid">
                    <div class="info-item full-width">
                        <div class="info-label">Descripción del Proyecto</div>
                        <div class="info-value">${interes}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>📊 Información de Seguimiento</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Origen de la Solicitud</div>
                        <div class="info-value">
                            <span class="source-badge">${source}</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Fecha y Hora</div>
                        <div class="info-value">
                            ${new Date(timestamp).toLocaleString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              timeZone: 'Europe/Madrid'
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <p><strong>Prisma Móvil - Sistema de Gestión de Contactos</strong></p>
            <p class="timestamp">Email generado automáticamente el ${new Date().toLocaleString('es-ES')}</p>
        </div>
    </div>
</body>
</html>
      `

      // Enviar email
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@prismamovil.com',
        to: destinationEmail,
        subject,
        html: emailContent,
      })

      // Email de confirmación para el usuario
      const userConfirmationEmail = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Solicitud - Prisma Móvil</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .highlight { color: #10b981; font-weight: 600; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ ¡Solicitud Recibida!</h1>
            <p>Gracias por confiar en Prisma Móvil</p>
        </div>
        
        <div class="content">
            <p>Hola <strong>${nombre}</strong>,</p>
            
            <p>Hemos recibido tu solicitud de contacto para <span class="highlight">${nombreEmpresa}</span> y queremos agradecerte por considerarnos como tu partner tecnológico.</p>
            
            <p><strong>¿Qué sigue ahora?</strong></p>
            <ul>
                <li>Nuestro equipo técnico revisará tu solicitud en las próximas horas</li>
                <li>Te contactaremos en un plazo máximo de <strong>24 horas hábiles</strong></li>
                <li>Prepararemos una propuesta personalizada para tu proyecto</li>
            </ul>

            <p>Mientras tanto, si tienes alguna pregunta urgente, no dudes en contactarnos directamente.</p>

            <p>¡Estamos deseando trabajar contigo!</p>
            
            <p>Saludos cordiales,<br>
            <strong>El equipo de Prisma Móvil</strong></p>
        </div>

        <div class="footer">
            <p><strong>Prisma Móvil</strong> - Soluciones Tecnológicas Empresariales</p>
        </div>
    </div>
</body>
</html>
      `

      // Enviar confirmación al usuario
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@prismamovil.com',
        to: email,
        subject: '✅ Confirmación de solicitud - Prisma Móvil',
        html: userConfirmationEmail,
      })

      // Guardar en la base de datos
      await prisma.lead.create({
        data: {
          name: `${nombre} ${apellidos}`,
          email,
          phone: telefono,
          page: 'empresa',
          message: `EMPRESA: ${nombreEmpresa} - CARGO: ${cargo} - ORIGEN: ${source} - INTERÉS: ${interes}`,
          createdAt: new Date(timestamp),
        }
      })

      return NextResponse.json({ success: true, message: 'Solicitud enviada correctamente' }, { status: 200 })
    }

    // Código existente para otros tipos de formularios
    const { type, nombre, apellidos, empresa, poblacion, provincia, telefono, email, motivo, timestamp } = body

    // Email de destino (por defecto o desde admin)
    const destinationEmail = process.env.ADMIN_EMAIL || 'clientes@prismamovil.es'

    let subject = ''
    let emailContent = ''

    switch (type) {
      case 'distributor':
        subject = 'Nueva solicitud de distribuidor'
        emailContent = `
          <h2>Nueva solicitud de distribuidor</h2>
          <p><strong>Nombre:</strong> ${nombre} ${apellidos}</p>
          <p><strong>Empresa:</strong> ${empresa}</p>
          <p><strong>Población:</strong> ${poblacion}</p>
          <p><strong>Provincia:</strong> ${provincia}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Fecha:</strong> ${new Date(timestamp).toLocaleString('es-ES')}</p>
        `
        
        // Guardar como lead con etiqueta de distribuidor
        await prisma.lead.create({
          data: {
            name: `${nombre} ${apellidos}`,
            email,
            phone: telefono,
            page: 'footer',
            message: `DISTRIBUIDOR - Empresa: ${empresa}, Población: ${poblacion}, Provincia: ${provincia}`,
          }
        })
        break

      case 'contact':
        subject = 'Nueva consulta de contacto'
        emailContent = `
          <h2>Nueva consulta de contacto</h2>
          <p><strong>Nombre:</strong> ${nombre} ${apellidos}</p>
          <p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
          <p><strong>Población:</strong> ${poblacion}</p>
          <p><strong>Provincia:</strong> ${provincia}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Fecha:</strong> ${new Date(timestamp).toLocaleString('es-ES')}</p>
        `
        
        // Guardar como lead con etiqueta de contacto
        await prisma.lead.create({
          data: {
            name: `${nombre} ${apellidos}`,
            email,
            phone: telefono,
            page: 'footer',
            message: `CONTACTO - Empresa: ${empresa || 'No especificada'}, Población: ${poblacion}, Provincia: ${provincia}`,
          }
        })
        break

      case 'support':
        subject = 'Nueva consulta de soporte técnico'
        emailContent = `
          <h2>Nueva consulta de soporte técnico</h2>
          <p><strong>Nombre:</strong> ${nombre} ${apellidos}</p>
          <p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
          <p><strong>Población:</strong> ${poblacion}</p>
          <p><strong>Provincia:</strong> ${provincia}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Motivo:</strong> ${motivo}</p>
          <p><strong>Fecha:</strong> ${new Date(timestamp).toLocaleString('es-ES')}</p>
        `
        // Para soporte no guardamos en leads, solo enviamos email
        break

      default:
        return NextResponse.json({ error: 'Tipo de formulario no válido' }, { status: 400 })
    }

    // Enviar email
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Prisma Móvil Web" <${process.env.SMTP_USER}>`,
      to: destinationEmail,
      subject,
      html: emailContent,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      message: 'Formulario procesado correctamente',
      type,
      saved: type !== 'support' // Indica si se guardó en la base de datos
    })

  } catch (error) {
    console.error('Error procesando formulario:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
