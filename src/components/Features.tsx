import React from 'react';
import { Target, Zap, Shield, Repeat, Palette, Cpu } from 'lucide-react';

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  detail: string;
}

const features: FeatureItem[] = [
  {
    icon: Target,
    title: 'Precisión Milimétrica',
    description: 'Calibración dimensional continua y tolerancias de hasta ±0.05 mm para ensamblajes perfectos, roscas funcionales y bujes.',
    detail: 'Ideal para ingeniería y prototipos de ensamble',
  },
  {
    icon: Cpu,
    title: 'Diversidad de Materiales Técnicos',
    description: 'Trabajamos con PLA ecológico, PETG reforzado con fibra de carbono, ABS termo-resistente, TPU elástico y Resinas monocromáticas 8K.',
    detail: 'Propiedades térmicas, mecánicas y estéticas',
  },
  {
    icon: Zap,
    title: 'Prototipado Ultrarrápido',
    description: 'Nuestra granja de impresoras CoreXY automatizadas opera 24/7 para iterar diseños y despachar prototipos en menos de 48 horas.',
    detail: 'Acelera tus ciclos de desarrollo de producto',
  },
  {
    icon: Shield,
    title: 'Asesoramiento Técnico Gratuito',
    description: 'Analizamos tus mallas 3D antes de imprimir: verificamos espesores mínimos, orientación de capas óptima y optimización de soportes.',
    detail: 'Aseguramos que tu pieza no falle en uso real',
  },
  {
    icon: Repeat,
    title: 'Producción Unitaria o en Serie',
    description: 'Fabricamos desde una única pieza personalizada hasta tiradas cortas y medianas de cientos de unidades sin costos de moldes tradicionales.',
    detail: 'Flexibilidad total para proyectos y empresas',
  },
  {
    icon: Palette,
    title: 'Post-Procesado Profesional',
    description: 'Ofrecemos acabados premium: curado UV controlado, remoción fina de soportes, inserciones roscadas en caliente y pulido superficial.',
    detail: 'Piezas listas para exhibición o ensamble final',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="caracteristicas" className="py-24 bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800/80 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
            Ventajas & Beneficios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            Por qué elegir a Cubito3D para tus proyectos
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Combinamos tecnología de vanguardia, experiencia en manufactura digital y un riguroso control de calidad para garantizar resultados consistentes y duraderos.
          </p>
        </div>

        {/* Feature Grid: 3 columns desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-500/10 transition-colors">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-xs font-medium text-cyan-600 dark:text-cyan-400/90">
                  {feature.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
