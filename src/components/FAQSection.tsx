import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { FAQItem } from '../types';
import { getWhatsAppUrl } from '../config/constants';

const faqItems: FAQItem[] = [
  {
    category: 'Archivos',
    question: '¿Qué formatos de archivo 3D aceptan para cotizar e imprimir?',
    answer: 'Aceptamos principalmente .STL, .OBJ, .STEP y .3MF. Si tienes un archivo paramétrico de CAD (como Fusion 360, SolidWorks o Rhino), el formato .STEP es ideal porque preserva superficies circulares exactas sin discretizar en polígonos.',
  },
  {
    category: 'Materiales',
    question: '¿Cómo elijo entre tecnología FDM (filamento) y Resina SLA?',
    answer: 'La tecnología FDM es perfecta para piezas funcionales, soportes, carcasas, engranajes y objetos grandes que requieren tenacidad y costo económico. La tecnología de Resina SLA (8K) se recomienda para piezas que exigen micro-detalles extremos sin marcas de capas visibles, como joyería, figuras de colección, prótesis dentales o miniaturas.',
  },
  {
    category: 'Procesos',
    question: '¿Tienen cantidad mínima de pedido (MOQ)?',
    answer: 'No. En Cubito3D puedes solicitar desde una única pieza personalizada o prototipo de prueba hasta tiradas medianas de cientos de unidades para tu negocio o emprendimiento.',
  },
  {
    category: 'Envíos',
    question: '¿Hacen envíos a todo el país y cómo protegen las piezas?',
    answer: 'Realizamos envíos a todo el país a través de correo prioritario y encomiendas con número de seguimiento. Cada pieza se empaca individualmente con papel burbuja antiestático, esquineros amortiguados y cajas de cartón corrugado reforzado para asegurar que llegue en condiciones impecables.',
  },
  {
    category: 'Materiales',
    question: '¿Qué resistencia mecánica y térmica tienen las piezas impresas en 3D?',
    answer: 'Depende del polímero elegido. El PLA es rígido y perfecto para interiores (hasta 55°C). El PETG ofrece gran resistencia al impacto y humedad. Para aplicaciones mecánicas exigentes bajo calor (>90°C) o contacto con aceites, recomendamos ABS, ASA o PETG reforzado con fibra de carbono.',
  },
  {
    category: 'Archivos',
    question: '¿Pueden ayudarme a diseñar si solo tengo una idea o el repuesto roto?',
    answer: '¡Por supuesto! Disponemos de servicio de ingeniería inversa y modelado CAD 3D. Puedes enviarnos fotos con medidas tomadas con regla o calibre, o bien traer la pieza física a nuestro taller para tomar cotas exactas.',
  },
  {
    category: 'Procesos',
    question: '¿Cuánto tiempo tarda la fabricación de un pedido?',
    answer: 'Los prototipos estándar y piezas del catálogo se despachan habitualmente en 24 a 48 horas hábiles. Para series de volumen medio o piezas con post-procesado especial de pintado, el tiempo suele rondar entre 3 y 5 días hábiles.',
  },
  {
    category: 'Procesos',
    question: '¿Cuáles son los métodos de pago disponibles?',
    answer: 'Aceptamos transferencia bancaria inmediata, Mercado Pago (dinero en cuenta y tarjetas de débito/crédito) y efectivo al retirar por nuestro taller.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Archivos', 'Materiales', 'Procesos', 'Envíos'];

  const filteredFaqs = faqItems.filter(
    (item) => activeCategory === 'Todos' || item.category === activeCategory
  );

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-950 relative border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
            Preguntas Frecuentes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Resolvemos tus Dudas Técnicas & Comerciales
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Todo lo que necesitas saber antes de iniciar tu proyecto de impresión 3D con nosotros.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === cat
                  ? 'bg-cyan-500 dark:bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                >
                  <span className="text-base font-semibold tracking-tight">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/30 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <div className="mt-3 text-[11px] text-cyan-600 dark:text-cyan-400/80 font-mono-tech">
                      Categoría: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra question helper */}
        <div className="mt-12 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-center space-y-2">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            ¿Tienes un requerimiento especial o material que no figura aquí?
          </p>
          <a
            href={getWhatsAppUrl('Hola Cubito3D, tengo una consulta técnica sobre impresión 3D')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Escríbenos directamente por WhatsApp y te asesoramos al instante
          </a>
        </div>
      </div>
    </section>
  );
};
