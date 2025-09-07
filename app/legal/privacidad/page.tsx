"use client";
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Aviso legal</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              Esta página Web es propiedad de <strong>ACELERA TU EXITO, S.L.</strong> con <strong>NIF nº B19758226</strong> y domicilio en Madrid e Inscrita en el Registro Mercantil de MADRID S 8, H M825682, I/A 1 (14.06.24) CVE: BORME-A-2024-119-28
            </p>

            <p>
              Esta página Web se rige por la normativa exclusivamente aplicable en España y el espacio que comprende la Unión Europea, quedando sometida a ella, tanto nacionales como extranjeros que utilicen esta Web.
            </p>

            <p>
              El acceso a nuestra página Web por parte del USUARIO es gratuito y está condicionado a la previa lectura y aceptación integra, expresa y sin reservas de las presentes <strong>CONDICIONES GENERALES DE USO</strong> vigentes en el momento del acceso, que rogamos lea detenidamente. El USUARIO en el momento que utiliza nuestro portal, sus contenidos o servicios, acepta y se somete expresamente a las condiciones generales de uso del mismo. Si el usuario no estuviere de acuerdo con las presentes condiciones de uso, deberá abstenerse de utilizar este portal y operar por medio del mismo.
            </p>

            <p>
              En cualquier momento podremos modificar la presentación y configuración de nuestra Web, ampliar o reducir servicios, e incluso suprimirla de la Red, así como los servicios y contenidos prestados, todo ello de forma unilateral y sin previo aviso.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A. Propiedad intelectual</h2>
            
            <p>
              Todos los contenidos, textos, imágenes, marcas y códigos fuente son de nuestra propiedad o de terceros a los que se han adquirido sus derechos de explotación, y están protegidos por los derechos de Propiedad Intelectual e Industrial.
            </p>

            <p>
              El usuario únicamente tiene derecho a un uso privado de los mismos, sin ánimo de lucro, y necesita autorización expresa para modificarlos, reproducirlos, explotarlos, distribuirlos o ejercer cualquier derecho perteneciente a su titular.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">B. Condiciones de acceso</h2>
            
            <p>
              El acceso a nuestra página Web es gratuito y no exige previa suscripción o registro. La finalidad de la misma es meramente informativa o publicitaria, de cualquier modo, se ofrece un formulario de contacto/consulta para que pueda solicitar más información.
            </p>

            <p>
              El usuario debe acceder a nuestra página Web conforme a la buena fe, las normas de orden público y a las Condiciones Generales de uso, Política de Cookies y Aviso Legal. El acceso a nuestro sitio Web se realiza bajo la propia y exclusiva responsabilidad del usuario, que responderá en todo caso de los daños y perjuicios que pueda causar a terceros o a nosotros mismos.
            </p>

            <p>
              Teniendo en cuenta la imposibilidad de control respecto a la información, contenidos y servicios que contengan otras páginas web a los que se pueda acceder a través de los enlaces que nuestra página web pueda poner a su disposición, le comunicamos que quedamos eximidos de cualquier responsabilidad por los daños y perjuicios de toda clase que pudiesen derivar por la utilización de esas páginas web, ajenas a nuestra empresa, por parte del usuario.
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
