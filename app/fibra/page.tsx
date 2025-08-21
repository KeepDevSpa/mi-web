import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Phone, MapPin, Check } from "lucide-react"
import Footer from "@/components/footer"

export default function FibraPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="text-lime-400">Soy particular</span>
            <span>|</span>
            <span className="text-lime-400">Soy empresa / autónomo</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Preguntas frecuentes</span>
            <span>Trabaja con nosotros</span>
            <Button variant="outline" size="sm" className="bg-lime-400 text-black border-lime-400 hover:bg-lime-500">
              <Phone className="w-4 h-4 mr-1" />
              Llámanos al 1560
            </Button>
            <div className="flex gap-1">
              <span>ES</span>
              <span className="text-gray-400">- EN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-black">Prisma</div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="/fibra-movil" className="text-gray-700 hover:text-gray-900">
                Fibra y Móvil
              </a>
              <a href="/fibra" className="text-lime-600 font-semibold">
                Fibra
              </a>
              <a href="/movil" className="text-gray-700 hover:text-gray-900">
                Móvil
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                PrismaTV
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Alarmas
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Prisma Stores</span>
              <Button variant="outline" size="sm">
                Área de Cliente
              </Button>
              <Button size="sm" className="bg-lime-400 text-black hover:bg-lime-500">
                <MapPin className="w-4 h-4 mr-1" />
                Ofertas para tu zona
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-400 to-blue-600 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/happy-jet-ski-riders.png" alt="People on jet ski" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Contrata tu
              <br />
              Fibra con Prisma
            </h1>
            <p className="text-lg mb-6">
              Contrata tu fibra de internet con Prisma. Encuentra la tarifa que más se adapta a ti. La mejor conexión al
              mejor precio en casa!
            </p>
          </div>

          <div className="absolute top-8 right-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-xs text-gray-600 mb-1">Fibra Evolution</div>
              <div className="text-lg font-bold text-black mb-2">
                Fibra óptica <strong>600Mb</strong>
                <br />
                Router <strong>WiFi 6</strong>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-sm text-gray-500 line-through">25€</span>
                <span className="text-3xl font-bold text-black">15€</span>
                <span className="text-sm text-gray-600">/mes</span>
              </div>
              <Badge className="bg-lime-400 text-black">-40%</Badge>
              <Button className="w-full mt-4 bg-gray-800 text-white hover:bg-gray-900">¡Lo quiero!</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fibra Plans Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Encuentra tu tarifa de Fibra</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Contratar internet es fácil con Prisma. Conoce las tarifas de fibra, encuentra la que más se adapte a ti.
              Navega con límites: 600 Mb, 1Gb o 10 Gb. Contrata internet con servicio y disfruta un 40% hasta enero del
              2026. ¡Conéctate con Prisma!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Fibra Evolution */}
            <Card className="overflow-hidden shadow-lg">
              <div className="bg-gray-600 text-white p-4 text-center">
                <Badge className="bg-lime-400 text-black mb-4">La más popular</Badge>
                <h3 className="text-xl font-bold">Fibra Evolution</h3>
              </div>
              <CardContent className="p-0">
                <div className="bg-gradient-to-b from-lime-200 to-lime-300 p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">
                        Fibra óptica simétrica <strong>600Mb</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm">
                        Router <strong>WiFi 6</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-sm text-gray-500 line-through">25€</span>
                    <span className="text-4xl font-bold text-black">15€</span>
                    <span className="text-sm text-gray-600">/mes</span>
                  </div>
                  <Button className="w-full bg-gray-800 text-white hover:bg-gray-900">¡Lo quiero!</Button>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Añade una línea de móvil desde 5€</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Añade una línea fija por 0€</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Añade PrismaTV por 5€</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fibra Pro */}
            <Card className="overflow-hidden shadow-lg">
              <div className="bg-gray-600 text-white p-4 text-center">
                <h3 className="text-xl font-bold">Fibra Pro</h3>
              </div>
              <CardContent className="p-0">
                <div className="bg-gradient-to-b from-gray-200 to-gray-300 p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      <span className="text-sm">
                        Fibra óptica simétrica <strong>1Gb</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      <span className="text-sm">
                        Router <strong>WiFi 6</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-sm text-gray-500 line-through">30€</span>
                    <span className="text-4xl font-bold text-black">18€</span>
                    <span className="text-sm text-gray-600">/mes</span>
                  </div>
                  <Button className="w-full bg-gray-800 text-white hover:bg-gray-900">¡Lo quiero!</Button>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Añade una línea de móvil desde 5€</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Añade una línea fija por 0€</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Añade PrismaTV por 5€</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fibra Master */}
            <Card className="overflow-hidden shadow-lg">
              <div className="bg-gray-600 text-white p-4 text-center">
                <h3 className="text-xl font-bold">Fibra Master</h3>
              </div>
              <CardContent className="p-0">
                <div className="bg-gradient-to-b from-yellow-200 to-yellow-300 p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="text-sm">
                        Fibra óptica <strong>10Gb</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="text-sm">
                        Router <strong>WiFi 6</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-black">40€</span>
                    <span className="text-sm text-gray-600">/mes</span>
                  </div>
                  <Button className="w-full bg-gray-800 text-white hover:bg-gray-900">¡Lo quiero!</Button>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Añade una línea de móvil desde 5€</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Añade una línea fija por 0€</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Añade PrismaTV</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-lime-400 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between gap-8">
            <div className="flex gap-8">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Código Postal</label>
                <Input placeholder="" className="bg-white border-gray-300 w-48" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Teléfono de contacto</label>
                <div className="text-xs text-black mb-1">Al enviar, aceptas la política de privacidad de Prisma.</div>
              </div>
            </div>
            <Button className="bg-green-700 text-white hover:bg-green-800 px-8 py-3 rounded-full">
              Comprobar cobertura
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ofertas en Fibra ¡y más!</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden rounded-2xl shadow-lg">
              <div className="relative">
                <img src="/happy-jet-ski-riders.png" alt="Fibra y Móvil offer" className="w-full h-48 object-cover" />
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4">
                  <div className="text-xs text-gray-600 mb-1">TODO EVOLUTION 20</div>
                  <div className="text-lg font-bold">
                    FIBRA <span className="text-gray-600">600Mb</span>
                    <br />
                    MÓVIL <span className="text-gray-600">20GB</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-bold text-green-600">18€</span>
                    <Badge className="bg-green-500 text-white text-xs">-40%</Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    PRECIO ORIGINAL <span className="line-through">30€</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden rounded-2xl shadow-lg bg-orange-500 text-white">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">TU HOGAR SEGURO CON LA TECNOLOGÍA MÁS AVANZADA.</h3>
                <div className="bg-white rounded-lg p-4 mb-6">
                  <img src="/placeholder-ll9em.png" alt="Security devices" className="mx-auto" />
                </div>
                <div className="text-lg font-bold mb-2">Prisma PROTECT</div>
                <div className="text-sm">O segurma</div>
              </div>
            </Card>

            <Card className="overflow-hidden rounded-2xl shadow-lg">
              <div className="relative">
                <img src="/happy-jet-ski-riders.png" alt="Todo Pro offer" className="w-full h-48 object-cover" />
                <div className="absolute bottom-4 right-4 bg-white rounded-lg p-4">
                  <div className="text-xs text-gray-600 mb-1">TODO PRO 60</div>
                  <div className="text-lg font-bold">
                    FIBRA <span className="text-gray-600">1Gb</span>
                    <br />
                    MÓVIL <span className="text-gray-600">60GB</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-bold text-green-600">24€</span>
                    <Badge className="bg-green-500 text-white text-xs">-40%</Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    PRECIO ORIGINAL <span className="line-through">40€</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Descubre nuestros servicios incluidos en Fibra</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center rounded-2xl shadow-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
              <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">⏸️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Servicio Pausa</h3>
              <p className="text-sm opacity-90">
                El Servicio Pausa de Prisma te permite suspender de manera temporal tu servicio de fibra cuando no lo
                necesites, y no pagar por él hasta que lo reactives. Y lo mejor de todo es que es totalmente gratuito
                hasta un máximo de 180 días al año.
              </p>
            </Card>

            <Card className="p-6 text-center rounded-2xl shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
              <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Tarifas Fijo</h3>
              <p className="text-sm opacity-90">
                Disfruta de tarifas competitivas para llamadas desde tu línea fija, con opciones que se adaptan a tus
                necesidades de comunicación. Mantente conectado con tus seres queridos sin preocuparte por los costes
                adicionales.
              </p>
            </Card>

            <Card className="p-6 text-center rounded-2xl shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">📶</span>
              </div>
              <h3 className="text-xl font-bold mb-3">WiFi Cobertura+</h3>
              <p className="text-sm opacity-90">
                Mejora la forma en la que conectas tu hogar a internet con mayor cobertura en cada rincón, estabilidad
                de la red y mayor duración con tu velocidad contratada.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-12">
            <div className="flex-1">
              <div className="bg-green-400 rounded-full w-64 h-64 flex items-center justify-center relative">
                <img src="/happy-customer-service-rep.png" alt="Customer service" className="rounded-full" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">¿Por qué elegir Prisma y sus tarifas de Fibra?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Internet con máxima velocidad,</strong> para todas tus necesidades.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Red propia de fibra,</strong> garantizando estabilidad.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Instalación rápida y sencilla,</strong> sin complicaciones.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Flexibilidad</strong> para adaptarte a las tarifas que mejor te convengan.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Servicio técnico eficaz</strong> que resuelve cualquier incidencia rápidamente.
                  </div>
                </div>
              </div>
              <Button className="mt-6 bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-full">
                Contrata la mejor fibra con Prisma
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Tu fibra más rápida en menos de 1 semana</h2>
          <p className="text-center text-gray-600 mb-12">Es la media de nuestras últimas 1.071 instalaciones</p>

          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📅</span>
              </div>
              <div className="font-bold text-lg mb-2">1</div>
              <p className="text-sm text-gray-600 max-w-32">
                Una vez confirmado nuestro técnico especializado, te contactamos para acordar la fecha y hora de
                instalación.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📅</span>
              </div>
              <div className="font-bold text-lg mb-2">2-3</div>
              <p className="text-sm text-gray-600 max-w-32">
                En 48 horas confirmamos un técnico especializado en tu zona. Te contacta la mejor fecha y hora.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📅</span>
              </div>
              <div className="font-bold text-lg mb-2">4-5</div>
              <p className="text-sm text-gray-600 max-w-32">
                Nuestro técnico acude a tu domicilio. La instalación es completamente gratuita y dura entre 1 y 2 horas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div className="font-bold text-lg mb-2">¡Ya puedes disfrutar de tu fibra Prisma!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
