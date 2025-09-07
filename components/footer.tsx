export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img src="/logo-prisma.svg" alt="Prisma" className="h-12 w-auto" />
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <span className="sr-only">Facebook</span>
                Facebook
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <span className="sr-only">Instagram</span>
                Instagram
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <span className="sr-only">LinkedIn</span>
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Fibra y Móvil</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/fibra-movil" className="hover:text-white">
                  Todo Evolution
                </a>
              </li>
              <li>
                <a href="/fibra-movil" className="hover:text-white">
                  Fibra + Móvil
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Fibra</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/fibra" className="hover:text-white">
                  Fibra Evolution
                </a>
              </li>
              <li>
                <a href="/fibra" className="hover:text-white">
                  Fibra Pro
                </a>
              </li>
              <li>
                <a href="/fibra" className="hover:text-white">
                  Fibra Master
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Móvil</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/movil" className="hover:text-white">
                  Móvil 5
                </a>
              </li>
              <li>
                <a href="/movil" className="hover:text-white">
                  Móvil 20
                </a>
              </li>
              <li>
                <a href="/movil" className="hover:text-white">
                  Móvil 60
                </a>
              </li>
              <li>
                <a href="/movil" className="hover:text-white">
                  Móvil Ilimitada
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PrismaTV</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/prisma-tv" className="hover:text-white">
                  Canales Premium
                </a>
              </li>
              <li>
                <a href="/prisma-tv" className="hover:text-white">
                  Deportes
                </a>
              </li>
              <li>
                <a href="/prisma-tv" className="hover:text-white">
                  Entretenimiento
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Seguridad</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/seguridad" className="hover:text-white">
                  Seguridad Física
                </a>
              </li>
              <li>
                <a href="/seguridad" className="hover:text-white">
                  Ciberseguridad
                </a>
              </li>
              <li>
                <a href="/seguridad" className="hover:text-white">
                  Control Parental
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <div>© 2024 Prisma. Todos los derechos reservados.</div>
            <div className="flex gap-4">
              <span>ES - EN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
