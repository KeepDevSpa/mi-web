import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Footer from "@/components/footer"

export default function Alarmas() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header sections same as main page */}
      <div className="bg-green-700 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span>Soy particular</span>
            <span>|</span>
            <span>Soy empresa / autónomo</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Preguntas frecuentes</span>
            <span>Trabaja con nosotros</span>
            <Button variant="outline" size="sm" className="bg-lime-400 text-black border-lime-400">
              Llámanos al 1560
            </Button>
            <div className="flex gap-1">
              <span>ES</span>
              <span className="text-gray-300">- EN</span>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-green-600">Prisma</div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-gray-900">
                Fibra y Móvil
              </a>
              <a href="/fibra" className="text-gray-700 hover:text-gray-900">
                Fibra
              </a>
              <a href="/movil" className="text-gray-700 hover:text-gray-900">
                Móvil
              </a>
              <a href="/olin-tv" className="text-gray-700 hover:text-gray-900">
                PrismaTV
              </a>
              <a href="/alarmas" className="text-green-600 font-semibold">
                Alarmas
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Prisma Stores</span>
              <Button variant="outline" size="sm">
                Área de Cliente
              </Button>
              <Button size="sm" className="bg-yellow-400 text-black">
                Ofertas para tu zona
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-6">Alarmas para casa: protege tu hogar</h1>
              <p className="text-xl mb-8">
                Vive con total tranquilidad y seguridad. Tenemos una alarma para cada hogar. Controla Prisma Protect y
                protege lo que más te importa. Tu familia.
              </p>
              <div className="text-sm mb-2">Prisma PROTECT</div>
              <div className="text-xs">O segurma</div>
            </div>
            <div className="flex-1 text-center">
              <div className="bg-white rounded-full w-64 h-64 flex items-center justify-center mx-auto mb-6">
                <img src="/security-system-technician.png" alt="Security technician" className="rounded-full" />
              </div>
              <Card className="bg-white text-black p-6 rounded-2xl shadow-xl max-w-sm mx-auto">
                <h3 className="text-lg font-bold mb-2">Hogar Tranquilidad</h3>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Central de alarma</li>
                  <li>• Sirena interior</li>
                  <li>• Placa disuasoria</li>
                  <li>• Mando</li>
                  <li>• Detector de movimiento</li>
                </ul>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-orange-500">19,90</span>
                  <span className="text-sm">€/mes</span>
                  <span className="text-sm line-through text-gray-500">43,90 €/mes</span>
                </div>
                <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">¡Lo quiero!</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Alarm Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Alarmas Prisma Protect</h2>
          <p className="text-center text-gray-600 mb-12">
            Tenemos el plan perfecto para proteger tu hogar y tu empresa. Máxima protección, instalación sencilla y
            control total.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <Button className="bg-orange-500 text-white px-6 py-2 rounded-full">Hogar Tranquilidad</Button>
            <Button variant="outline" className="px-6 py-2 rounded-full bg-transparent">
              Hogar Tranquilidad +
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="rounded-2xl shadow-lg overflow-hidden">
              <CardContent className="p-8 text-center">
                <img src="/basic-home-security.png" alt="Basic security system" className="mx-auto mb-6" />
                <ul className="text-left space-y-2 mb-6">
                  <li>✓ Central de alarma</li>
                  <li>✓ 2 Detectores con cámara</li>
                  <li>✓ Placa disuasoria</li>
                  <li>✓ Teclado</li>
                  <li>✓ Sirena interior</li>
                  <li>✓ 3 TAG</li>
                  <li>✓ Mando</li>
                </ul>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">43,90€/mes</div>
                  <div className="text-3xl font-bold">19,90€/mes*</div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg overflow-hidden">
              <CardContent className="p-8 text-center">
                <img src="/advanced-home-security.png" alt="Advanced security system" className="mx-auto mb-6" />
                <ul className="text-left space-y-2 mb-6">
                  <li>✓ Central de alarma</li>
                  <li>✓ 2 Detectores con cámara</li>
                  <li>✓ Placa disuasoria</li>
                  <li>✓ Teclado</li>
                  <li>✓ Detector de movimiento</li>
                  <li>✓ Sirena interior</li>
                  <li>✓ 3 TAG</li>
                  <li>✓ Mando</li>
                  <li>✓ Detector magnético</li>
                  <li>✓ Cámara IP</li>
                </ul>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">49,80€/mes</div>
                  <div className="text-3xl font-bold">19,90€/mes*</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            *Oferta válida por tiempo limitado.
            <br />
            *Los 6 primeros meses | IVA incluido.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-orange-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Alarmas para casa</h2>
          <p className="text-gray-600 mb-8">
            Protege tu hogar con Prisma Protect. Alarma, sensores y control total desde el móvil. Seguridad avanzada,
            tranquilidad garantizada. Todo por solo 19,90€/mes. ¡Llámanos e infórmate!
          </p>
          <Button className="bg-orange-500 text-white hover:bg-orange-600 px-8 py-3 rounded-full">
            Contrata Prisma Protect ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
