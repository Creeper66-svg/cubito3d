/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AboutUs } from './components/AboutUs';
import { Catalog } from './components/Catalog';
import { Services } from './components/Services';
import { NewsSection } from './components/NewsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { Product } from './types';
import { getWhatsAppUrl } from './config/constants';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-black transition-colors duration-200">
          {/* Navigation Bar with Theme Toggle */}
          <Navbar />

          {/* Main Content Sections */}
          <main className="flex-1">
            {/* 1. Inicio: Presentación principal, eslogan e imágenes */}
            <Hero />

            {/* 2. Características: Ventajas y beneficios de elegir Cubito3D */}
            <Features />

            {/* 3. Catálogo: Conectado a Supabase (tabla 'productos') */}
            <Catalog onSelectProduct={(prod) => setSelectedProduct(prod)} />

            {/* 4. Servicios: Impresión 3D personalizada, fabricación a pedido & Cotizador STL */}
            <Services />

            {/* 5. Nosotros: Presentación del taller, historia y filosofía */}
            <AboutUs />

            {/* 6. Novedades: Últimas creaciones, productos y noticias del taller */}
            <NewsSection />

            {/* 7. Preguntas frecuentes: Consultas habituales interactivas */}
            <FAQSection />

            {/* 8. Contacto: Información de contacto, WhatsApp y redes sociales */}
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Interactive Shopping Cart Drawer */}
          <CartDrawer />

          {/* Product Quick-View Modal */}
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />

          {/* Floating Quick WhatsApp Chat Widget with new number 3888676575 */}
          <aside aria-label="Contacto directo" className="fixed bottom-6 right-6 z-30">
            <a
              href={getWhatsAppUrl('Hola Cubito3D, estoy en su web y quisiera hacerles una consulta')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir chat de WhatsApp con Cubito3D"
              className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-full shadow-xl shadow-emerald-950/30 hover:scale-105 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline font-bold">¿Dudas? Chatea con nosotros</span>
            </a>
          </aside>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
