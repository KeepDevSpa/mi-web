"use client";
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos y Condiciones</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              Los presentes términos y condiciones de uso (en adelante, "Términos") regulan el acceso y uso de los servicios ofrecidos por <strong>ACELERA TU ÉXITO, S.L.</strong> (en adelante, "Prisma Móvil", "nosotros" o "la empresa") a través de su sitio web.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Aceptación de los términos</h2>
            <p>
              Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos Términos y Condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Servicios ofrecidos</h2>
            <p>
              Prisma Móvil ofrece servicios de telecomunicaciones incluyendo telefonía móvil, fibra óptica, televisión digital, servicios de seguridad y energía. Los servicios específicos, tarifas y condiciones están sujetos a disponibilidad geográfica y pueden variar según la ubicación.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Uso del sitio web</h2>
            <p>
              Usted se compromete a utilizar este sitio web de manera responsable y conforme a la ley. Está prohibido:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utilizar el sitio para actividades ilegales o no autorizadas</li>
              <li>Transmitir virus, malware o cualquier código malicioso</li>
              <li>Intentar obtener acceso no autorizado a nuestros sistemas</li>
              <li>Reproducir, distribuir o modificar el contenido sin autorización</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Protección de datos</h2>
            <p>
              El tratamiento de sus datos personales se realiza conforme a nuestra Política de Privacidad y la normativa vigente en materia de protección de datos (RGPD). Al utilizar nuestros servicios, usted consiente el tratamiento de sus datos según se describe en dicha política.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Limitación de responsabilidad</h2>
            <p>
              Prisma Móvil no se hace responsable de los daños directos o indirectos que puedan derivarse del uso de este sitio web o de la imposibilidad de utilizarlo, salvo en los casos establecidos por la ley.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor en el momento de su publicación en el sitio web.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Legislación aplicable</h2>
            <p>
              Estos términos se rigen por la legislación española. Para cualquier controversia que pudiera derivarse, las partes se someten a los juzgados y tribunales de Madrid.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <button 
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
