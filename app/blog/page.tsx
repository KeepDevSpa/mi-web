import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "Fibra óptica vs ADSL: ¿Cuál es la mejor opción para tu hogar?",
    excerpt:
      "Descubre las principales diferencias entre fibra óptica y ADSL, y por qué la fibra es la mejor opción para disfrutar de internet de alta velocidad.",
    image: "/placeholder-tx4vf.png",
    category: "Tecnología",
    date: "28 Agosto 2025",
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
      date: "15 Julio 2025",
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
      date: "22 Junio 2025",
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
      date: "10 Mayo 2025",
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
      date: "3 Abril 2025",
      author: "David López",
      readTime: "7 min",
    },
    {
      id: 6,
      title: "Teletrabajo eficiente con Prisma",
      excerpt: "Consejos para optimizar tu conexión y herramientas para trabajar desde casa de manera productiva.",
      image: "/home-office-remote-work.png",
      category: "Trabajo",
      date: "18 Marzo 2025",
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
      date: "5 Febrero 2025",
      author: "Roberto García",
      readTime: "4 min",
    },
  ]

  const categories = ["Todos", "Tecnología", "Consejos", "Seguridad", "Entretenimiento", "Trabajo", "Móvil"]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-emerald-100/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200/15 rounded-full blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Actualizado regularmente
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Blog de <span className="text-green-600">Prisma</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Descubre las últimas noticias, consejos expertos y tendencias en tecnología, conectividad y hogar inteligente
            </p>
            <div className="max-w-lg mx-auto relative">
              <Input
                type="text"
                placeholder="Buscar artículos, guías, consejos..."
                className="pl-12 pr-6 py-4 text-lg rounded-2xl border-2 border-green-200 focus:border-green-500 bg-white/80 backdrop-blur-sm shadow-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 h-6 w-6" />
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
    </div>
  )
}
