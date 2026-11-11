import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NewsItem } from '../types';

const newsData: NewsItem[] = [
  {
    id: 'n-1',
    titulo: 'Lanzamiento de Lámparas Voronoi Paramétricas',
    categoria: 'Nuevo Producto',
    fecha: 'Marzo 2026',
    resumen: 'Presentamos nuestra nueva colección de diseño bio-paramétrico. Piezas lumínicas impresas en PLA Mate con bases de madera natural mecanizadas en taller.',
    imagen: '/src/assets/images/product_geometric_sculpture_1794326992967.jpg',
    etiqueta: 'Diseño & Decoración',
  },
  {
    id: 'n-2',
    titulo: 'Piezas Técnicas en PETG con Fibra de Carbono',
    categoria: 'Materiales Avanzados',
    fecha: 'Febrero 2026',
    resumen: 'Incorporamos filamentos reforzados con microfibras de carbono para soportar esfuerzos mecánicos severos, torsión y altas temperaturas en robótica.',
    imagen: '/src/assets/images/product_mechanical_gearset_1794326993897.jpg',
    etiqueta: 'Ingeniería',
  },
  {
    id: 'n-3',
    titulo: 'Ampliación de Granja: Tiempos de Entrega Reducidos en 30%',
    categoria: 'Taller & Granja',
    fecha: 'Enero 2026',
    resumen: 'Sumamos 6 impresoras CoreXY con calibración automatizada por resonancia y extrusión de alto flujo, permitiendo despachos en 24 horas para pedidos urgentes.',
    imagen: '/src/assets/images/workshop_team_farm_1794326994341.jpg',
    etiqueta: 'Capacidad de Planta',
  },
];

export const NewsSection: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <section id="novedades" className="py-24 bg-slate-100/70 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800/80 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
              Novedades del Taller
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Últimas Creaciones, Técnicas & Noticias
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Descubre las últimas incorporaciones a nuestra granja, innovaciones en filamentos y proyectos especiales fabricados en Cubito3D.
            </p>
          </div>
        </div>

        {/* News Grid: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group rounded-2xl bg-white dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Clean unboxed metadata (no pill enclosures) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="text-cyan-600 dark:text-cyan-400 font-medium">{item.categoria}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.fecha}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {item.titulo}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {item.resumen}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-300">
                  <span>Conocer más detalles</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal for viewing news detail */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-xl w-full rounded-2xl overflow-hidden p-6 space-y-4 shadow-2xl">
            <div className="relative h-56 rounded-xl overflow-hidden">
              <img
                src={selectedNews.imagen}
                alt={selectedNews.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-cyan-600 dark:text-cyan-400 font-medium">{selectedNews.categoria}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedNews.fecha}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedNews.titulo}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selectedNews.resumen}</p>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
