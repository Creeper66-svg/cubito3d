import React from 'react';
import { Award, Compass, Recycle, Cpu } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="nosotros" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Workshop Image Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
              <img
                src="/src/assets/images/workshop_team_farm_1794326994341.jpg"
                alt="Instalaciones del taller Cubito3D y granja de manufactura aditiva"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs space-y-1 text-white">
                <div className="font-semibold">Taller Cubito3D · Buenos Aires</div>
                <div className="text-slate-400">Granja con más de 18 unidades FDM y estaciones de lavado & curado UV SLA</div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <p className="text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
              Nosotros · Historia & Filosofía
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight text-balance">
              Transformando ideas complejas en objetos reales y duraderos
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              <p>
                <strong className="text-slate-900 dark:text-white font-semibold">Cubito3D</strong> nació de la confluencia entre la pasión por la ingeniería mecánica y el diseño digital. Lo que comenzó como un laboratorio experimental de dos impresoras evolucionó rápidamente en un taller de manufactura aditiva integral equipado con tecnología de última generación.
              </p>
              <p>
                Nuestra filosofía se basa en tres pilares irrenunciables: <span className="text-slate-900 dark:text-slate-100 font-medium">precisión dimensional rigurosa</span>, <span className="text-slate-900 dark:text-slate-100 font-medium">atención personalizada a cada modelo</span> y <span className="text-slate-900 dark:text-slate-100 font-medium">compromiso sustentable</span>.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none space-y-2">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm">
                  <Cpu className="w-4 h-4" />
                  <span>Tecnología Híbrida FDM & SLA</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Utilizamos impresoras CoreXY para resistencia estructural y SLA monocromáticas 8K para detalles hiper-realistas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <Recycle className="w-4 h-4" />
                  <span>Cero Desperdicio & Polímeros ECO</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Priorizamos PLA de origen renovable (almidón vegetal) y reciclamos purgas y soportes en ciclos cerrados.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none space-y-2">
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-semibold text-sm">
                  <Compass className="w-4 h-4" />
                  <span>Ingeniería Colaborativa</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  No solo imprimimos archivos: asesoramos a estudiantes, startups y talleres mecánicos para optimizar su diseño.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                  <Award className="w-4 h-4" />
                  <span>Control de Calidad Unitario</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Cada pieza producida pasa por inspección visual y calibración de calibre digital antes de su empaquetado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
