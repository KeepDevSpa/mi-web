import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Phone, MapPin, CheckCircle, Wifi, Shield, Clock } from "lucide-react"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
            <Button variant="outline" size="sm" className="bg-lime-400 text-black border-lime-400 hover:bg-lime-500">
              <Phone className="w-4 h-4 mr-1" />
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
            <div className="flex items-center">
              <img src="/logo-prisma.svg" alt="Prisma" className="h-12 w-auto" />
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="/fibra-movil" className="text-gray-700 hover:text-gray-900">
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
              <a href="/alarmas" className="text-gray-700 hover:text-gray-900">
                Alarmas
              </a>
              <a href="/blog" className="text-gray-700 hover:text-gray-900">
                Blog
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Prisma Stores</span>
              <Button variant="outline" size="sm">
                Área de Cliente
              </Button>
              <Button size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500">
                <MapPin className="w-4 h-4 mr-1" />
                Ofertas para tu zona
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative h-[500px] bg-gradient-to-r from-cyan-400 to-blue-500 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/pool-selfie-hero.jpeg"
            alt="People enjoying pool time with selfie stick"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              AHORRA CON
              <br />
              LA FIBRA Y MÓVIL
              <br />Y PERMÍTETE
              <br />
              UN CAPRICHITO.
            </h1>
          </div>
          <div className="absolute top-8 right-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-xs text-gray-600 mb-1">TODO EVOLUTION 20</div>
              <div className="text-2xl font-bold mb-2">
                FIBRA <span className="text-gray-600">600Mb</span>
                <br />
                MÓVIL <span className="text-gray-600">20GB</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">HASTA ENERO 2026</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-green-600">18€</span>
                <span className="text-sm">MES</span>
                <Badge className="bg-green-500 text-white text-xs">-40%</Badge>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                PRECIO ORIGINAL <span className="line-through">30€</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Existing cards section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Solo Fibra Card */}
            <Card className="overflow-hidden shadow-lg rounded-2xl">
              <div className="bg-gray-500 text-white p-4 text-center relative">
                <div className="text-sm text-gray-300 mb-1">
                  Solo <span className="text-white font-semibold">Fibra</span>
                </div>
                <Badge className="bg-yellow-400 text-black mb-3 text-xs font-medium px-3 py-1">La más popular</Badge>
                <h3 className="text-lg font-bold text-white">Fibra Evolution</h3>
                <div className="absolute -top-1 -right-1">
                  <Badge className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-bold">-40%</Badge>
                </div>
              </div>
              <CardContent className="p-0">
                <div className="bg-gray-200 p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>
                        Fibra óptica simétrica <strong>600Mb</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>
                        Router <strong>WiFi 6</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 text-center">
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-6xl font-bold text-black">15</span>
                    <span className="text-sm text-gray-600">€/mes</span>
                  </div>
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700 rounded-full py-2 font-medium">
                    ¡Lo quiero!
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fibra + Móvil Card */}
            <Card className="overflow-hidden shadow-lg rounded-2xl">
              <div className="bg-gray-500 text-white p-4 text-center relative">
                <div className="text-sm text-gray-300 mb-1">
                  <span className="text-white font-semibold">Fibra + Móvil</span>
                </div>
                <Badge className="bg-yellow-400 text-black mb-3 text-xs font-medium px-3 py-1">La más popular</Badge>
                <h3 className="text-lg font-bold text-white">Todo Evolution 60</h3>
                <div className="absolute -top-1 -right-1">
                  <Badge className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-bold">-40%</Badge>
                </div>
              </div>
              <CardContent className="p-0">
                <div className="bg-gray-200 p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>
                        Fibra óptica simétrica <strong>800Mb</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>
                        Router <strong>WiFi 6</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>
                        Línea móvil <strong>60GB</strong> con velocidad 5G
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>
                        Llamadas <strong>ilimitadas</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 text-center">
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-6xl font-bold text-black">21</span>
                    <span className="text-sm text-gray-600">€/mes</span>
                  </div>
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700 rounded-full py-2 font-medium">
                    ¡Lo quiero!
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Solo Móvil Card */}
            <Card className="overflow-hidden shadow-lg rounded-2xl">
              <div className="bg-green-700 text-white p-4 text-center relative">
                <div className="text-sm text-green-200 mb-1">
                  Solo <span className="text-white font-semibold">MÓVIL</span>
                </div>
                <Badge className="bg-yellow-400 text-black mb-3 text-xs font-medium px-3 py-1">La más popular</Badge>
                <h3 className="text-lg font-bold text-white">Móvil 60</h3>
                <div className="absolute -top-1 -right-1">
                  <Badge className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-bold">-40%</Badge>
                </div>
              </div>
              <CardContent className="p-0">
                <div className="bg-gray-200 p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>
                        <strong>60GB</strong> con velocidad 5G
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>
                        Llamadas <strong>ilimitadas</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 text-center">
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-6xl font-bold text-black">9</span>
                    <span className="text-sm text-gray-600">€/mes</span>
                  </div>
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700 rounded-full py-2 font-medium">
                    ¡Lo quiero!
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ofertas en Fibra ¡y más!</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden rounded-2xl shadow-lg relative">
              <div className="relative h-80">
                <img
                  src="/happy-jet-ski-riders.png"
                  alt="Ahorra con la fibra y permítete un caprichito"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4 text-white">
                  <h3 className="text-xl font-bold leading-tight">
                    AHORRA CON
                    <br />
                    LA FIBRA Y PERMÍTETE
                    <br />
                    UN CAPRICHITO.
                  </h3>
                </div>
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">TODO PRO 60</div>
                  <div className="text-sm font-bold mb-2">
                    FIBRA <span className="text-gray-600">1Gb</span>
                    <br />
                    MÓVIL <span className="text-gray-600">60GB</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">HASTA ENERO 2026</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-600">24€</span>
                    <Badge className="bg-green-500 text-white text-xs">-40%</Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    PRECIO ORIGINAL <span className="line-through">40€</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden rounded-2xl shadow-lg bg-orange-500 text-white relative">
              <CardContent className="p-0 h-80 flex flex-col">
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-6 leading-tight">
                    TU HOGAR SEGURO,
                    <br />
                    CON LA TECNOLOGÍA
                    <br />
                    MÁS AVANZADA.
                  </h3>
                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-10-tXVzwI5LZSeGcNZNmCtMRt6VYoxqR9.webp"
                      alt="Security devices"
                      className="max-w-full h-32 object-contain"
                    />
                  </div>
                </div>
                <div className="bg-black/20 p-4 text-center">
                  <div className="text-lg font-bold">PrismaPROTECT</div>
                  <div className="text-sm opacity-90">O segurma</div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl shadow-lg bg-lime-400 text-black relative">
              <CardContent className="p-0 h-80 flex flex-col">
                <div className="p-6 flex-1 flex flex-col justify-center items-center text-center">
                  <div className="bg-black text-lime-400 px-4 py-2 rounded-full text-lg font-bold mb-4">PLAN AMIGO</div>
                  <div className="mb-6">
                    <div className="text-4xl mb-2">🤝</div>
                    <h3 className="text-xl font-bold mb-2">CONSIGUE</h3>
                    <div className="text-4xl font-bold">100€</div>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div className="bg-black text-lime-400 px-3 py-2 rounded-lg">
                      <div className="text-lg font-bold">50€</div>
                      <div className="text-xs">PARA TI</div>
                    </div>
                    <div className="bg-black text-lime-400 px-3 py-2 rounded-lg">
                      <div className="text-lg font-bold">50€</div>
                      <div className="text-xs">
                        PARA TU
                        <br />
                        AMIGO
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Descubre nuestros servicios incluidos en Fibra</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center rounded-2xl shadow-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Servicio Pausa</h3>
              <p className="text-sm opacity-90">
                El Servicio Pausa de Prisma te permite suspender de manera temporal tu servicio de fibra cuando no lo
                necesites, y no pagar por él hasta que lo reactives. Y lo mejor de todo es que es totalmente gratuito
                hasta un máximo de 180 días al año.
              </p>
            </Card>

            <Card className="p-6 text-center rounded-2xl shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
              <Wifi className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Tarifas Fijo</h3>
              <p className="text-sm opacity-90">
                Disfruta de tarifas competitivas para llamadas desde tu línea fija, con opciones que se adaptan a tus
                necesidades de comunicación. Mantente conectado con tus seres queridos sin preocuparte por los costes
                adicionales.
              </p>
            </Card>

            <Card className="p-6 text-center rounded-2xl shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <Shield className="w-12 h-12 mx-auto mb-4" />
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
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Internet con máxima velocidad,</strong> para todas tus necesidades.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Red propia de fibra,</strong> garantizando estabilidad.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Instalación rápida y sencilla,</strong> sin complicaciones.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Flexibilidad</strong> para adaptarte a las tarifas que mejor te convengan.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
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
          <h2 className="text-3xl font-bold text-center mb-4">Tu Fibra y móvil más rápida en menos de 1 semana</h2>
          <p className="text-center text-gray-600 mb-12">Es la media de nuestras últimas 1.071 instalaciones</p>

          <div className="bg-gray-100 rounded-2xl p-8">
            {/* Top row - Days 1-8 */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium">📅 Día 1</div>
                <div className="w-8 h-px bg-gray-400"></div>
                <div className="bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium">📅 Día 2-3</div>
                <div className="w-8 h-px bg-gray-400"></div>
                <div className="bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium">📅 Día 4-5</div>
                <div className="w-8 h-px bg-gray-400"></div>
                <div className="bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium">📅 Día 5-6</div>
                <div className="w-8 h-px bg-gray-400"></div>
                <div className="bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium">📅 Día 6-7</div>
                <div className="w-8 h-px bg-gray-400"></div>
                <div className="bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium">📅 Día 8</div>
              </div>
            </div>

            {/* Green cards row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="bg-lime-400 text-black p-4 rounded-xl">
                <h3 className="font-bold text-sm mb-2">¡Bienvenido!</h3>
                <p className="text-xs">Contratas el servicio y recibes un correo de bienvenida con tu contrato.</p>
              </Card>

              <Card className="bg-lime-400 text-black p-4 rounded-xl">
                <h3 className="font-bold text-sm mb-2">Te contactamos</h3>
                <p className="text-xs">Te contactamos para coordinar la instalación.</p>
              </Card>

              <Card className="bg-lime-400 text-black p-4 rounded-xl">
                <h3 className="font-bold text-sm mb-2">Instalación</h3>
                <p className="text-xs">Nuestro técnico instala la fibra en tu casa en menos de 2 horas.</p>
              </Card>

              <Card className="bg-lime-400 text-black p-4 rounded-xl">
                <h3 className="font-bold text-sm mb-2">¡Listo!</h3>
                <p className="text-xs">Disfruta de una conexión ultrarrápida.</p>
              </Card>
            </div>

            {/* Cyan cards row */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-cyan-400 text-black p-4 rounded-xl">
                <h3 className="font-bold text-sm mb-2">Recibes la SIM</h3>
                <p className="text-xs">Recibes tu tarjeta SIM. Si es un número nuevo, ya estará activa.</p>
              </Card>

              <Card className="bg-cyan-400 text-black p-4 rounded-xl">
                <h3 className="font-bold text-sm mb-2">Portabilidad</h3>
                <p className="text-xs">Gestionamos la portabilidad de tu número si lo necesitas.</p>
              </Card>

              <Card className="bg-cyan-400 text-black p-4 rounded-xl">
                <h3 className="font-bold text-sm mb-2">Día de cambio</h3>
                <p className="text-xs">Llega la madrugada, introduces la SIM de Prisma en tu móvil.</p>
              </Card>

              <Card className="bg-cyan-400 text-black p-4 rounded-xl">
                <h3 className="font-bold text-sm mb-2">¡Listo!</h3>
                <p className="text-xs">Habla y navega con Prisma desde el primer día.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-400 py-8">
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

      <Footer />
    </div>
  )
}
