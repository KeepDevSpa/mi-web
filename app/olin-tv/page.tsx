import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Tv, Film, Trophy } from "lucide-react"
import Footer from "@/components/footer"

export default function PrismaTV() {
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
              <a href="/olin-tv" className="text-green-600 font-semibold">
                PrismaTV
              </a>
              <a href="/alarmas" className="text-gray-700 hover:text-gray-900">
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
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">PrismaTV</h1>
          <p className="text-xl mb-8">Disfruta del mejor entretenimiento con más de 100 canales</p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
            <Play className="w-5 h-5 mr-2" />
            Descubre PrismaTV
          </Button>
        </div>
      </section>

      {/* TV Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Paquetes de Televisión</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-blue-500 text-white p-6 text-center">
                <Tv className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Básico</h3>
                <div className="text-3xl font-bold">
                  5€<span className="text-lg">/mes</span>
                </div>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>50+ canales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>HD disponible</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Grabación en la nube</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600">Contratar</Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg overflow-hidden border-2 border-green-500">
              <div className="bg-green-500 text-white p-6 text-center relative">
                <Badge className="absolute top-2 right-2 bg-yellow-400 text-black">Más popular</Badge>
                <Film className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="text-3xl font-bold">
                  12€<span className="text-lg">/mes</span>
                </div>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>100+ canales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>4K Ultra HD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Canales premium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Netflix incluido</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-green-500 hover:bg-green-600">Contratar</Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-purple-500 text-white p-6 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Deportes</h3>
                <div className="text-3xl font-bold">
                  18€<span className="text-lg">/mes</span>
                </div>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Todos los deportes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>LaLiga, Champions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Fórmula 1, MotoGP</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Múltiples pantallas</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-purple-500 hover:bg-purple-600">Contratar</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
