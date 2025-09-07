"use client";
export default function CookiesPage() {
  return (
  <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Cookies</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              En cumplimiento con lo dispuesto en el artículo 22.2 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, esta página web le informa, en esta sección, sobre la política de recogida y tratamiento de las cookies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">¿Qué son las cookies?</h2>
            <p>
              Una cookie es un pequeño fragmento de texto que los sitios web que visita envían al navegador y que permite que el sitio web recuerde información sobre su visita, como su idioma preferido y otras opciones, lo que puede facilitar su próxima visita y hacer que el sitio le resulte más útil.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tipos de cookies que utilizamos</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Cookies técnicas</h3>
            <p>
              Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Cookies de análisis</h3>
            <p>
              Son aquellas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Cookies de preferencias</h3>
            <p>
              Permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies de terceros</h2>
            <p>
              Este sitio web utiliza servicios de terceros que recopilan información con fines estadísticos, de uso del sitio por parte del usuario y para la prestación de otros servicios relacionados con la actividad del sitio web y otros servicios de Internet.
            </p>

            <p>
              En particular, este sitio web utiliza Google Analytics, un servicio analítico de web prestado por Google, Inc. con domicilio en los Estados Unidos con sede en 1600 Amphitheatre Parkway, Mountain View, California 94043.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Configuración de cookies</h2>
            <p>
              Puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador. Al desactivar las cookies, algunos de los servicios disponibles podrían dejar de estar operativos.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Enlaces para configurar cookies en navegadores principales:</h3>
              <ul className="space-y-2">
                <li><strong>Chrome:</strong> Configuración → Avanzada → Privacidad y seguridad → Configuración del sitio → Cookies</li>
                <li><strong>Firefox:</strong> Preferencias → Privacidad y seguridad → Cookies y datos del sitio</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web</li>
                <li><strong>Edge:</strong> Configuración → Ver configuración avanzada → Cookies</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Consentimiento</h2>
            <p>
              Al continuar navegando por este sitio web sin configurar su navegador para que rechace las cookies, usted está consintiendo la utilización de las mismas en los términos expresados en esta Política de Cookies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contacto</h2>
            <p>
              Si tiene alguna duda sobre esta Política de Cookies, puede contactar con nosotros enviando un email a: <a href="mailto:clientes@prismamovil.es" className="text-green-600 hover:text-green-700">clientes@prismamovil.es</a>
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
