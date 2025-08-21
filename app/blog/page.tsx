import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import Footer from "@/components/footer"

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "Fibra óptica vs ADSL: ¿Cuál es la mejor opción para tu hogar?",
    excerpt:
      "Descubre las principales diferencias entre fibra óptica y ADSL, y por qué la fibra es la mejor opción para disfrutar de internet de alta velocidad.",
    image: "/placeholder-tx4vf.png",
    category: "Tecnología",
    date: "15 Enero 2025",
    author: "Equipo Prisma",
    readTime: "5 min",
  }

  const blogPosts = [
    {
      id: 2,
      title: "Cómo optimizar tu conexión WiFi en casa",
      excerpt:
        "Consejos prácticos para mejorar la señal WiFi y obtener la máxima velocidad en todos los rincones de tu hogar.",
      image: "/wifi-router-home-setup.png",
      category: "Consejos",
      date: "12 Enero 2025",
      author: "María González",
      readTime: "4 min",
    },
    {
      id: 3,
      title: "5G: La revolución de la conectividad móvil",
      excerpt:
        "Todo lo que necesitas saber sobre la tecnología 5G y cómo está transformando la forma en que nos conectamos.",
      image: "/5g-network.png",
      category: "Tecnología",
      date: "10 Enero 2025",
      author: "Carlos Ruiz",
      readTime: "6 min",
    },
    {
      id: 4,
      title: "Seguridad en el hogar: Alarmas conectadas",
      excerpt:
        "Descubre cómo las alarmas inteligentes pueden proteger tu hogar y mantenerte conectado desde cualquier lugar.",
      image: "/smart-home-security.png",
      category: "Seguridad",
      date: "8 Enero 2025",
      author: "Ana Martín",
      readTime: "5 min",
    },
    {
      id: 5,
      title: "Streaming sin interrupciones: Guía completa",
      excerpt:
        "Aprende a configurar tu conexión para disfrutar de tus series y películas favoritas sin cortes ni buffering.",
      image: "/streaming-tv-setup.png",
      category: "Entretenimiento",
      date: "5 Enero 2025",
      author: "David López",
      readTime: "7 min",
    },
    {
      id: 6,
      title: "Teletrabajo eficiente con Prisma",
      excerpt: "Consejos para optimizar tu conexión y herramientas para trabajar desde casa de manera productiva.",
      image: "/home-office-remote-work.png",
      category: "Trabajo",
      date: "3 Enero 2025",
      author: "Laura Sánchez",
      readTime: "6 min",
    },
    {
      id: 7,
      title: "Portabilidad móvil: Cambiate sin complicaciones",
      excerpt:
        "Guía paso a paso para cambiar tu número de teléfono a Prisma manteniendo todos tus contactos y servicios.",
      image: "/mobile-portability.png",
      category: "Móvil",
      date: "1 Enero 2025",
      author: "Roberto García",
      readTime: "4 min",
    },
  ]

  const categories = ["Todos", "Tecnología", "Consejos", "Seguridad", "Entretenimiento", "Trabajo", "Móvil"]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Soy particular</span>
            <span>|</span>
            <span>Soy empresa/autónomo</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Preguntas frecuentes</span>
            <span>Trabaja con nosotros</span>
            <span>📞 Llámanos al 1540</span>
            <span>🇪🇸 ES - EN</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center">
                <Image src="/logo-prisma.svg" alt="Prisma" width={120} height={40} className="h-8 w-auto" />
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/fibra-movil" className="text-gray-700 hover:text-green-600">
                  Fibra y Móvil
                </Link>
                <Link href="/fibra" className="text-gray-700 hover:text-green-600">
                  Fibra
                </Link>
                <Link href="/movil" className="text-gray-700 hover:text-green-600">
                  Móvil
                </Link>
                <Link href="/olin-tv" className="text-gray-700 hover:text-green-600">
                  Prisma TV
                </Link>
                <Link href="/alarmas" className="text-gray-700 hover:text-green-600">
                  Alarmas
                </Link>
                <Link href="/blog" className="text-green-600 font-medium">
                  Blog
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/tienda" className="text-gray-700 hover:text-green-600">
                Prisma Stores
              </Link>
              <Link href="/area-cliente" className="text-gray-700 hover:text-green-600">
                Área de Cliente
              </Link>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">📍 Ofertas para ti</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Blog de Prisma</h1>
            <p className="text-xl text-gray-600 mb-8">
              Descubre las últimas noticias, consejos y tendencias en tecnología, conectividad y hogar inteligente
            </p>
            <div className="max-w-md mx-auto relative">
              <Input
                type="text"
                placeholder="Buscar artículos..."
                className="pl-10 pr-4 py-3 rounded-full border-2 border-green-200 focus:border-green-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "Todos" ? "default" : "outline"}
                className={
                  category === "Todos" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50 hover:text-green-600"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Artículo Destacado</h2>
          <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-green-100 text-green-800">{featuredPost.category}</Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredPost.date}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="h-4 w-4 mr-1" />
                    {featuredPost.author} • {featuredPost.readTime} lectura
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Leer más <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Últimos Artículos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-green-100 text-green-800">{post.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <User className="h-4 w-4 mr-1" />
                      {post.author} • {post.readTime}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-green-50 hover:text-green-600 bg-transparent"
                    >
                      Leer más
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿No te quieres perder nada?</h2>
          <p className="text-xl mb-8 opacity-90">
            Suscríbete a nuestro newsletter y recibe las últimas noticias y consejos directamente en tu email
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input type="email" placeholder="Tu email" className="flex-1 bg-white text-gray-900" />
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-8">Suscribirse</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
