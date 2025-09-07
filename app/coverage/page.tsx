import CoverageCheck from '@/components/coverage-check'

export default function CoveragePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Consulta la cobertura en tu zona
          </h1>
          <p className="text-lg text-gray-600">
            Verifica la disponibilidad de nuestros servicios en tu ubicación
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <CoverageCheck
            backgroundClass="bg-gray-50"
            buttonClass="bg-green-600 hover:bg-green-700 text-white"
            buttonText="Consultar cobertura"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fibra Óptica</h3>
            <p className="text-gray-600">Hasta 1Gb de velocidad simétrica disponible en la mayoría de ubicaciones</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Red Móvil</h3>
            <p className="text-gray-600">Cobertura 4G y 5G en constante expansión por todo el territorio nacional</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">PrismaTV</h3>
            <p className="text-gray-600">Televisión de alta calidad disponible donde tengas fibra óptica</p>
          </div>
        </div>
      </div>
    </div>
  )
}
