import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://lmbagdotmpfekgpzvrja.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_Ke6ZQXb2R52fKq1JYof6jw__CX_j3iz';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface Product {
  id?: string | number;
  nombre: string;
  precio: number;
  imagen_url: string;
  material: string;
  stock: number;
  descripcion?: string;
  dimensiones?: string;
  destacado?: boolean;
}

// Catálogo de respaldo premium de Cubito3D (utilizado si la tabla remota está vacía o cargando)
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'f-1',
    nombre: 'Lámpara Voronoi Orgánica',
    precio: 28500,
    imagen_url: '/src/assets/images/product_geometric_sculpture_1794326992967.jpg',
    material: 'PLA Mate Blanco',
    stock: 8,
    descripcion: 'Lámpara de diseño escultural paramétrico con patrón celular Voronoi. Difusión lumínica cálida y base de madera noble mecanizada.',
    dimensiones: '22 x 12 x 12 cm',
    destacado: true,
  },
  {
    id: 'f-2',
    nombre: 'Engranaje Planetario de Alta Precisión',
    precio: 19800,
    imagen_url: '/src/assets/images/product_mechanical_gearset_1794326993897.jpg',
    material: 'PETG Fibra de Carbono',
    stock: 14,
    descripcion: 'Mecanismo planetario funcional para robótica y prototipos mecánicos de alta exigencia térmica y fricción reducida.',
    dimensiones: '10 x 10 x 4 cm',
    destacado: true,
  },
  {
    id: 'f-3',
    nombre: 'Soporte Ergonómico para Auriculares Studio',
    precio: 14200,
    imagen_url: '/src/assets/images/product_geometric_sculpture_1794326992967.jpg',
    material: 'PLA+ Gris Espacial',
    stock: 22,
    descripcion: 'Soporte minimalista curvado con gestión integrada de cables y base antideslizante para escritorio.',
    dimensiones: '26 x 14 x 10 cm',
    destacado: false,
  },
  {
    id: 'f-4',
    nombre: 'Organizador Modular Hexagonal Tech',
    precio: 9800,
    imagen_url: '/src/assets/images/product_mechanical_gearset_1794326993897.jpg',
    material: 'PLA Negro Satinado',
    stock: 19,
    descripcion: 'Set de 4 módulos hexagonales acoplables magnéticamente para herramientas de precisión, bolígrafos y cables.',
    dimensiones: '18 x 16 x 8 cm',
    destacado: false,
  },
  {
    id: 'f-5',
    nombre: 'Busto Escultural Neo-Clásico en Resina 8K',
    precio: 34000,
    imagen_url: '/src/assets/images/product_geometric_sculpture_1794326992967.jpg',
    material: 'Resina UV Alta Definición',
    stock: 5,
    descripcion: 'Impresión en resina fotosensible a 28 micrones de capa con detalle anatómico microscópico y curado ultravioleta.',
    dimensiones: '19 x 11 x 9 cm',
    destacado: true,
  },
  {
    id: 'f-6',
    nombre: 'Maceta Geométrica Autorregable Fractal',
    precio: 12500,
    imagen_url: '/src/assets/images/product_geometric_sculpture_1794326992967.jpg',
    material: 'PLA Terracota Biodegradable',
    stock: 11,
    descripcion: 'Diseño geométrico poligonal con cámara interna de agua y depósito permeable para suculentas y plantas de interior.',
    dimensiones: '13 x 13 x 12 cm',
    destacado: false,
  },
];

export interface FetchProductsResult {
  products: Product[];
  source: 'supabase' | 'fallback';
  error: string | null;
  count: number;
}

export async function fetchProductsFromSupabase(): Promise<FetchProductsResult> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*');

    if (error) {
      console.warn('Error al consultar tabla productos en Supabase:', error.message);
      return {
        products: FALLBACK_PRODUCTS,
        source: 'fallback',
        error: error.message,
        count: FALLBACK_PRODUCTS.length,
      };
    }

    if (!data || data.length === 0) {
      console.info('Tabla productos en Supabase vacía, mostrando productos de catálogo del taller.');
      return {
        products: FALLBACK_PRODUCTS,
        source: 'fallback',
        error: null,
        count: FALLBACK_PRODUCTS.length,
      };
    }

    // Normalizar datos de Supabase asegurando tipos correctos
    const parsedProducts: Product[] = data.map((item: any, idx: number) => ({
      id: item.id || `sp-${idx}`,
      nombre: String(item.nombre || 'Pieza 3D Personalizada'),
      precio: Number(item.precio) || 0,
      imagen_url: item.imagen_url || '/src/assets/images/product_geometric_sculpture_1794326992967.jpg',
      material: String(item.material || 'PLA Premium'),
      stock: item.stock !== undefined && item.stock !== null ? Number(item.stock) : 10,
      descripcion: item.descripcion || `Fabricado con tecnología aditiva en ${item.material || 'PLA'} de primera calidad.`,
      dimensiones: item.dimensiones || 'A medida',
      destacado: idx < 3,
    }));

    return {
      products: parsedProducts,
      source: 'supabase',
      error: null,
      count: parsedProducts.length,
    };
  } catch (err: any) {
    console.error('Fallo de red al conectar con Supabase:', err);
    return {
      products: FALLBACK_PRODUCTS,
      source: 'fallback',
      error: err?.message || 'Error de conexión',
      count: FALLBACK_PRODUCTS.length,
    };
  }
}
