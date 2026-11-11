// Catálogo centralizado y resiliente de imágenes de Cubito3D
// Diseñado para máxima disponibilidad en Vercel, Netlify, Docker y desarrollo local.
// Estrategia de triple redundancia:
// 1. Activo empaquetado en el bundle de Vite (se compila a dist/assets/ con hash, hospedado directamente en el dominio de Vercel).
// 2. Ruta estática pública (/images/...).
// 3. CDN global de alta disponibilidad (HTTP/2 200 con caché mundial).

import localHero from '../assets/images/hero_3d_printer_workshop_1794326992377.jpg';
import localWorkshop from '../assets/images/workshop_team_farm_1794326994341.jpg';
import localSculpture from '../assets/images/product_geometric_sculpture_1794326992967.jpg';
import localGearset from '../assets/images/product_mechanical_gearset_1794326993897.jpg';

export const LOCAL_BUNDLED_IMAGES = {
  hero: localHero,
  workshop: localWorkshop,
  sculpture: localSculpture,
  gearset: localGearset,
};

export const PUBLIC_IMAGES = {
  hero: '/images/hero_3d_printer_workshop.jpg',
  workshop: '/images/workshop_team_farm.jpg',
  sculpture: '/images/product_geometric_sculpture.jpg',
  gearset: '/images/product_mechanical_gearset.jpg',
};

export const SITE_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1741517669003-94a4cb80f793?w=1200&auto=format&fit=crop&q=85',
  workshopFarm: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=85',
  extrudingNozzle: 'https://images.unsplash.com/photo-1742971366169-6efb57949d56?w=800&auto=format&fit=crop&q=85',
  activePrinting: 'https://images.unsplash.com/photo-1741517540162-451e3f5d6318?w=800&auto=format&fit=crop&q=85',

  // Productos de catálogo
  products: {
    lampVoronoi: 'https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?w=800&auto=format&fit=crop&q=85',
    gearsetMechanic: 'https://images.unsplash.com/photo-1742971366169-6efb57949d56?w=800&auto=format&fit=crop&q=85',
    headphoneStand: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=85',
    hexOrganizer: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=85',
    resinSculpture: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=85',
    fractalPlanter: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=85',
  },

  // Novedades del taller
  news: {
    voronoiLaunch: 'https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?w=800&auto=format&fit=crop&q=85',
    petgCarbon: 'https://images.unsplash.com/photo-1742971366169-6efb57949d56?w=800&auto=format&fit=crop&q=85',
    farmExpansion: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=85',
  },
};

// Cadenas de respaldo ordenadas por fiabilidad para evitar imágenes rotas
export const HERO_FALLBACK_SOURCES: string[] = [
  localHero,
  SITE_IMAGES.hero,
  PUBLIC_IMAGES.hero,
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=85',
];

export const WORKSHOP_FALLBACK_SOURCES: string[] = [
  localWorkshop,
  SITE_IMAGES.workshopFarm,
  PUBLIC_IMAGES.workshop,
  localHero,
];

export const PRODUCT_FALLBACK_LIST: string[] = [
  localSculpture,
  localGearset,
  SITE_IMAGES.products.lampVoronoi,
  SITE_IMAGES.products.gearsetMechanic,
  SITE_IMAGES.products.headphoneStand,
  SITE_IMAGES.products.hexOrganizer,
  SITE_IMAGES.products.resinSculpture,
  SITE_IMAGES.products.fractalPlanter,
  PUBLIC_IMAGES.sculpture,
  PUBLIC_IMAGES.gearset,
];
