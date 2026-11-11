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

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuoteConfig {
  material: 'PLA' | 'PETG' | 'ABS' | 'TPU' | 'Resina 8K';
  infill: number; // percentage
  layerHeight: number; // in mm
  color: string;
  quantity: number;
  estimatedWeightGrams: number;
  fileName?: string;
  fileSizeMb?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Archivos' | 'Materiales' | 'Envíos' | 'Procesos';
}

export interface NewsItem {
  id: string;
  titulo: string;
  categoria: string;
  fecha: string;
  resumen: string;
  imagen: string;
  etiqueta: string;
}
