"use client";

interface ConversionTriggerProps {
  title: string;
  description: string;
  highlight?: string;
  serviceColor?: string;
}

export default function ConversionTrigger({ 
  title, 
  description, 
  highlight,
  serviceColor = "blue"
}: ConversionTriggerProps) {
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'movil':
        return 'from-green-500 to-emerald-600';
      case 'fibra':
        return 'from-blue-500 to-cyan-600';
      case 'convergente':
        return 'from-teal-500 to-cyan-600';
      case 'tv':
        return 'from-purple-500 to-violet-600';
      case 'seguridad':
        return 'from-gray-600 to-slate-700';
      case 'energia':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-gray-600 leading-relaxed">
            {description}
            {highlight && (
              <>
                {" "}
                <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${getColorClasses(serviceColor)}`}>
                  {highlight}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
