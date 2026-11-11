import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Eye, RefreshCw, Database, CheckCircle, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { fetchProductsFromSupabase, FetchProductsResult } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { PRODUCT_FALLBACK_LIST } from '../config/images';
import { ImageWithFallback } from './ImageWithFallback';

interface CatalogProps {
  onSelectProduct: (product: Product) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onSelectProduct }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionInfo, setConnectionInfo] = useState<FetchProductsResult | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [addedProductId, setAddedProductId] = useState<string | number | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    const result = await fetchProductsFromSupabase();
    setProducts(result.products);
    setConnectionInfo(result);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Extract materials for interactive filter tabs
  const materialList = ['all', ...Array.from(new Set(products.map((p) => p.material.split(' ')[0])))];

  // Filtering & Sorting
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesMaterial =
      selectedMaterial === 'all' || p.material.toLowerCase().includes(selectedMaterial.toLowerCase());

    return matchesSearch && matchesMaterial;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.precio - b.precio;
    if (sortBy === 'price-desc') return b.precio - a.precio;
    return 0;
  });

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    const pId = product.id ?? product.nombre;
    setAddedProductId(pId);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="catalogo" className="py-24 bg-slate-50 dark:bg-slate-900/40 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
              Catálogo Oficial
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Creaciones & Piezas Disponibles
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Objetos decorativos, accesorios de escritorio y piezas mecánicas fabricadas con los más altos estándares de calidad y acabado.
            </p>
          </div>

          {/* Supabase live connection metadata indicator */}
          <div className="flex items-center gap-2 text-xs px-3.5 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shadow-sm dark:shadow-none">
            <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span>
              {connectionInfo?.source === 'supabase' ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Supabase en vivo: tabla &apos;productos&apos;</span>
              ) : (
                <span>Supabase conectado · Modo catálogo Cubito3D</span>
              )}
            </span>
            <button
              onClick={loadProducts}
              title="Refrescar catálogo"
              className="ml-1 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Search, Material Filter Tabs & Sort Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          {/* Material Segmented Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {materialList.map((mat) => {
              const isActive = selectedMaterial === mat;
              const label = mat === 'all' ? 'Todos los materiales' : mat;
              return (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-cyan-500 dark:bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                      : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search Bar & Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por nombre o material..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="default">Relevancia</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 p-4 space-y-4 animate-pulse">
                <div className="w-full h-56 bg-slate-200 dark:bg-slate-900 rounded-xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-8 bg-slate-200 dark:bg-slate-900 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && sortedProducts.length === 0 && (
          <div className="text-center py-20 px-4 bg-white dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No se encontraron productos</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Prueba cambiando los términos de búsqueda o seleccionando otro filtro de material.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedMaterial('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/60 transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        )}

        {/* Product Grid: 3-column desktop layout */}
        {!loading && sortedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => {
              const pId = product.id ?? product.nombre;
              const isAdded = addedProductId === pId;

              return (
                <div
                  key={pId}
                  onClick={() => onSelectProduct(product)}
                  className="group rounded-2xl bg-white dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xl shadow-sm dark:shadow-none hover:shadow-slate-300/40 dark:hover:shadow-black/40 transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
                >
                  {/* Image container: 65-75% height ratio with fallback */}
                  <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <ImageWithFallback
                      src={product.imagen_url}
                      alt={product.nombre}
                      fallbackSrc={PRODUCT_FALLBACK_LIST}
                      fallbackTitle={product.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

                    {/* Quick view button */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="p-2 rounded-lg bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white backdrop-blur-md border border-slate-200 dark:border-slate-700/80 shadow-md inline-flex items-center justify-center">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Stock badge: text-based quiet metadata */}
                    <div className="absolute bottom-3 left-3 text-[11px] font-mono-tech px-2 py-0.5 rounded bg-white/90 dark:bg-slate-950/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      {product.stock > 0 ? (
                        <span>Stock: {product.stock} un.</span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400">Bajo pedido</span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="text-cyan-600 dark:text-cyan-400 font-medium">{product.material}</span>
                        {product.dimensiones && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{product.dimensiones}</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {product.nombre}
                      </h3>

                      {product.descripcion && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {product.descripcion}
                        </p>
                      )}
                    </div>

                    {/* Price & Buy Action */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Precio</div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white font-mono-tech">
                          {formatCurrency(product.precio)}
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                          isAdded
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-400 dark:hover:bg-cyan-300 text-slate-950 shadow-sm'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            Agregado
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Agregar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
