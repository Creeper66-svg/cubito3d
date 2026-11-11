import React from 'react';
import { Box, MessageSquare, ArrowUp } from 'lucide-react';
import { getWhatsAppUrl } from '../config/constants';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Box className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-display">
                Cubito<span className="text-cyan-600 dark:text-cyan-400">3D</span>
              </span>
            </div>

            <p className="text-slate-700 dark:text-slate-300 text-sm italic font-medium">
              &quot;Damos forma a tu imaginación&quot;
            </p>

            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
              Taller especializado en prototipado rápido, manufactura aditiva y producción de piezas funcionales y artísticas en filamento de ingeniería y resina 8K.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono-tech">
                Buenos Aires · Envíos a todo el país
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#caracteristicas" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Servicios & Cotizador
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Technology & Materials */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Materiales & Procesos
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>PLA Ecológico & PLA Seda</li>
              <li>PETG Reforzado Carbono</li>
              <li>ABS / ASA Alta Temperatura</li>
              <li>TPU Elástico 95A</li>
              <li>Resina UV 8K Alta Definición</li>
              <li>Modelado CAD & Ingeniería Inversa</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Canales Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  WhatsApp Taller
                </a>
              </li>
              <li>
                <a href="mailto:hola@cubito3d.com" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  hola@cubito3d.com
                </a>
              </li>
              <li className="text-slate-500 dark:text-slate-500">
                Lun a Vie 09:00 - 19:00 hs
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300"
                >
                  <ArrowUp className="w-3.5 h-3.5" /> Volver arriba
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Cubito3D. Todos los derechos reservados. Damos forma a tu imaginación.
          </div>
          <div className="flex items-center gap-4">
            <a href="#faq" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">
              Preguntas Frecuentes
            </a>
            <span>·</span>
            <a href="#servicios" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">
              Términos de Fabricación
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
