import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { getWhatsAppUrl } from '../config/constants';
import { PRODUCT_FALLBACK_LIST } from '../config/images';
import { ImageWithFallback } from './ImageWithFallback';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, totalItems, subtotal } =
    useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes] = useState('');

  if (!isCartOpen) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const freeShippingThreshold = 50000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    let itemsList = '';
    cart.forEach((item, idx) => {
      itemsList += `${idx + 1}. ${item.product.nombre} (x${item.quantity}) - Material: ${item.product.material} - ${formatCurrency(item.product.precio * item.quantity)}\n`;
    });

    const msg =
      `Hola Cubito3D! 👋 Quiero confirmar el siguiente pedido de su tienda web:\n\n` +
      `📦 DETALLE DEL PEDIDO:\n` +
      `${itemsList}\n` +
      `💰 SUBTOTAL: ${formatCurrency(subtotal)}\n\n` +
      `👤 DATOS DE ENTREGA:\n` +
      `Nombre: ${customerName || 'No indicado'}\n` +
      `Dirección / Localidad: ${customerAddress || 'Retiro en taller'}\n` +
      (customerNotes ? `Notas: ${customerNotes}\n` : '') +
      `\n¿Podrían indicarme los datos de pago y tiempo de despacho? ¡Muchas gracias!`;

    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer content */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Tu Carrito de Compras</h2>
              <span className="text-xs font-mono-tech px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                {totalItems} {totalItems === 1 ? 'ítem' : 'ítems'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex justify-between items-center mb-1.5 text-slate-700 dark:text-slate-300">
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ¡Calificas para Envío Gratis!
                  </span>
                ) : (
                  <span>
                    Agrega <strong className="text-cyan-600 dark:text-cyan-400 font-mono-tech">{formatCurrency(freeShippingThreshold - subtotal)}</strong> más para envío gratis
                  </span>
                )}
              </span>
              <span className="font-mono-tech text-slate-500 dark:text-slate-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-cyan-500 dark:bg-cyan-400 h-1.5 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Tu carrito está vacío</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                  Explora nuestro catálogo para encontrar figuras, repuestos técnicos y decoraciones 3D.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const pId = item.product.id ?? item.product.nombre;
                return (
                  <div
                    key={pId}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 flex gap-3 items-center"
                  >
                    <ImageWithFallback
                      src={item.product.imagen_url}
                      alt={item.product.nombre}
                      fallbackSrc={PRODUCT_FALLBACK_LIST}
                      fallbackTitle={item.product.nombre}
                      className="w-16 h-16 rounded-lg object-cover bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {item.product.nombre}
                      </h4>
                      <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
                        {item.product.material}
                      </div>
                      <div className="text-xs font-mono-tech text-slate-900 dark:text-white font-bold">
                        {formatCurrency(item.product.precio)}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(pId)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 text-xs">
                        <button
                          onClick={() => updateQuantity(pId, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                          -
                        </button>
                        <span className="font-mono-tech font-bold px-1 text-slate-900 dark:text-white text-[11px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(pId, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Quick customer delivery inputs */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Datos para tu Pedido (Opcional)
                </div>
                <input
                  type="text"
                  placeholder="Tu Nombre completo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Dirección de envío o 'Retiro por taller'"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono-tech text-slate-900 dark:text-white font-bold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Envío</span>
                  <span className="font-mono-tech text-slate-700 dark:text-slate-300">
                    {subtotal >= freeShippingThreshold ? 'Gratis' : 'A convenir / calcular'}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                  <span>Total estimado</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-mono-tech text-base">{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Finalizar Pedido vía WhatsApp
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Atención directa sin comisiones extras</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
