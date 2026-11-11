import React, { useState } from 'react';
import { X, ShoppingBag, CheckCircle, Cpu } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-white/80 dark:bg-slate-950/70 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
            <img
              src={product.imagen_url}
              alt={product.nombre}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 text-xs font-mono-tech px-2.5 py-1 rounded bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300">
              {product.stock > 0 ? `Stock: ${product.stock} un.` : 'Fabricación a pedido'}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{product.material}</span>
                {product.dimensiones && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{product.dimensiones}</span>
                  </>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {product.nombre}
              </h3>

              <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono-tech">
                {formatCurrency(product.precio)}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.descripcion ||
                  'Pieza fabricada en el taller de Cubito3D con riguroso control de tolerancias, curado y empaque de protección.'}
              </p>

              {/* Technical specs block */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Especificaciones de Taller</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 text-[11px]">
                  <div>
                    <span className="text-slate-400">Material:</span> {product.material}
                  </div>
                  <div>
                    <span className="text-slate-400">Dimensiones:</span> {product.dimensiones || 'Estándar'}
                  </div>
                  <div>
                    <span className="text-slate-400">Tecnología:</span> FDM / SLA 8K
                  </div>
                  <div>
                    <span className="text-slate-400">Despacho:</span> 24-48 hs
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-1 text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="font-mono-tech font-bold px-2 text-slate-900 dark:text-white text-xs">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isAdded
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-400 dark:hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      ¡Agregado al Carrito!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Agregar al Carrito ({formatCurrency(product.precio * quantity)})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
