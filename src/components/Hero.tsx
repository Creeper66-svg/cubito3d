import React from 'react';
import { ArrowRight, Layers, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Background blueprint grid and subtle radial gradient */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              <span>Taller de Fabricación Digital & Manufactura Aditiva</span>
            </div>

            {/* Main Headline with Slogan */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] text-balance">
              Damos forma a tu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-500">
                imaginación
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              En <strong className="text-slate-900 dark:text-white font-semibold">Cubito3D</strong> convertimos tus archivos digitales e ideas en objetos tangibles con máxima precisión. Prototipos funcionales, piezas mecánicas a medida, figuras de colección y producción en serie con tecnología FDM y Resina 8K.
            </p>

            {/* Feature bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                <span>Tolerancias de alta precisión técnica</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                <span>Envíos ágiles a todo el país</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                <span>Polímeros ecológicos y resinas de ingeniería</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                <span>Asesoramiento y verificación de mallas STL</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-200"
              >
                Explorar Catálogo
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 rounded-xl shadow-sm transition-all duration-200"
              >
                <Layers className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                Cotizar Impresión 3D
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-2xl shadow-cyan-950/10 dark:shadow-cyan-950/30 group">
              <img
                src="/src/assets/images/hero_3d_printer_workshop_1794326992377.jpg"
                alt="Granja de impresoras 3D profesionales en Cubito3D"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Technical floating badges on image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800/80 shadow-lg text-white">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono-tech mb-2">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Granja Cubito3D Activa
                  </span>
                  <span>FDM · CoreXY & SLA 8K</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 border-t border-slate-800/60 pt-2">
                  <span>Resolución de capa</span>
                  <span className="text-white font-semibold font-mono-tech">0.05 mm — 0.28 mm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width KPI Strip below the hero split */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono-tech tabular-nums">+5.000</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Piezas impresas y entregadas</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono-tech tabular-nums">±0.05 mm</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Tolerancia en ensambles mecánicos</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono-tech tabular-nums">24 — 48 h</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Despacho ágil en pedidos estándar</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-sky-600 dark:text-sky-400 font-mono-tech tabular-nums">100%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Compromiso de satisfacción y garantía</div>
          </div>
        </div>
      </div>
    </section>
  );
};
