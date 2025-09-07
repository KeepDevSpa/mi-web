"use client";
export default function LOPDPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Protección de Datos Personales (RGPD)</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales (RGPD), <strong>ACELERA TU ÉXITO, S.L.</strong> informa a los usuarios de su página web sobre la política de tratamiento de los datos personales.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Responsable del tratamiento</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-2">
                <li><strong>Empresa:</strong> ACELERA TU ÉXITO, S.L.</li>
                <li><strong>NIF:</strong> B19758226</li>
                <li><strong>Domicilio:</strong> Madrid</li>
                <li><strong>Email:</strong> clientes@prismamovil.es</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Finalidades del tratamiento</h2>
            <p>Los datos personales que nos proporcione serán tratados con las siguientes finalidades:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestionar las consultas realizadas a través de los formularios de contacto</li>
              <li>Proporcionar información sobre nuestros servicios de telecomunicaciones</li>
              <li>Gestionar solicitudes de distribuidores</li>
              <li>Enviar comunicaciones comerciales (solo con su consentimiento)</li>
              <li>Cumplir con las obligaciones legales aplicables</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Base jurídica</h2>
            <p>El tratamiento de sus datos se basa en:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Ejecución de un contrato:</strong> Para la prestación de servicios solicitados</li>
              <li><strong>Consentimiento:</strong> Para el envío de comunicaciones comerciales</li>
              <li><strong>Interés legítimo:</strong> Para responder a consultas y mejorar nuestros servicios</li>
              <li><strong>Cumplimiento legal:</strong> Para cumplir obligaciones normativas</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conservación de datos</h2>
            <p>
              Los datos personales se conservarán durante el tiempo necesario para cumplir con las finalidades para las que se recabaron y, en todo caso, durante los plazos establecidos por la legislación aplicable.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Derechos del interesado</h2>
            <p>Como titular de los datos, usted tiene derecho a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> Conocer qué datos tratamos y cómo</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
              <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos</li>
              <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos</li>
              <li><strong>Limitación:</strong> Solicitar la restricción del tratamiento</li>
              <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
              <li><strong>Revocación del consentimiento:</strong> Retirar el consentimiento en cualquier momento</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Ejercicio de derechos</h2>
            <p>
              Para ejercer sus derechos, puede dirigirse a nosotros mediante:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: <a href="mailto:clientes@prismamovil.es" className="text-green-600 hover:text-green-700">clientes@prismamovil.es</a></li>
              <li>Indicando claramente el derecho que desea ejercer</li>
              <li>Acompañando copia de su documento de identidad</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Autoridad de control</h2>
            <p>
              Si considera que el tratamiento de sus datos personales vulnera la normativa, puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD):
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-2">
                <li><strong>Web:</strong> www.aepd.es</li>
                <li><strong>Dirección:</strong> C/ Jorge Juan, 6. 28001 – Madrid</li>
                <li><strong>Teléfono:</strong> 912 663 517</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Seguridad</h2>
            <p>
              Hemos adoptado medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo del tratamiento, con el fin de proteger los datos personales frente al tratamiento no autorizado o ilícito y frente a la pérdida, destrucción o daño accidental.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Actualización</h2>
            <p>
              Esta política de protección de datos puede ser actualizada para adaptarse a novedades legislativas o jurisprudenciales, así como a prácticas de la industria. Le recomendamos revisar periódicamente esta página.
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
