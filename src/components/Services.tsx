import React, { useState, useId } from 'react';
import { UploadCloud, FileCode2, Sliders, CheckCircle2, MessageCircle, Info, Clock, Weight, Wrench } from 'lucide-react';
import { getWhatsAppUrl } from '../config/constants';

export const Services: React.FC = () => {
  const fileInputId = useId();
  // Interactive 3D Quote Estimator State
  const [fileName, setFileName] = useState<string>('soporte_mecanico_v2.stl');
  const [fileSizeMb, setFileSizeMb] = useState<number>(4.2);
  const [simulatedVolumeCm3, setSimulatedVolumeCm3] = useState<number>(45);
  const [selectedMaterial, setSelectedMaterial] = useState<'PLA' | 'PETG' | 'ABS' | 'TPU' | 'Resina 8K'>('PLA');
  const [infill, setInfill] = useState<number>(20);
  const [layerHeight, setLayerHeight] = useState<number>(0.20);
  const [selectedColor, setSelectedColor] = useState<string>('Negro Mate');
  const [quantity, setQuantity] = useState<number>(1);
  const [fileUploaded, setFileUploaded] = useState<boolean>(true);

  // Material rates per gram (ARS)
  const materialData = {
    PLA: { rate: 45, density: 1.24, label: 'PLA Ecológico', desc: 'Acabado liso, biodegradable y decorativo' },
    PETG: { rate: 55, density: 1.27, label: 'PETG Técnico', desc: 'Resistente a impactos y rayos UV' },
    ABS: { rate: 60, density: 1.05, label: 'ABS Industrial', desc: 'Resistente a temperatura (>90°C) y fricción' },
    TPU: { rate: 70, density: 1.21, label: 'TPU Flexible 95A', desc: 'Elastomérico para sellos, fundas y topes' },
    'Resina 8K': { rate: 95, density: 1.15, label: 'Resina UV 8K', desc: 'Ultra-detalle a 28 micrones, miniaturas' },
  };

  // Calculation logic
  const matInfo = materialData[selectedMaterial];
  const infillFactor = 0.3 + (infill / 100) * 0.7; // shell + infill
  const layerTimeFactor = layerHeight === 0.05 ? 3.0 : layerHeight === 0.12 ? 1.6 : layerHeight === 0.20 ? 1.0 : 0.75;
  const estimatedGrams = Math.round(simulatedVolumeCm3 * matInfo.density * infillFactor);
  const baseCostPerUnit = Math.round(estimatedGrams * matInfo.rate + 3500 * layerTimeFactor);
  const totalCost = baseCostPerUnit * quantity;
  const estimatedHours = Math.max(1.5, Math.round((estimatedGrams * 0.08 * layerTimeFactor) * 10) / 10);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSizeMb(Math.round((file.size / (1024 * 1024)) * 10) / 10);
      const simVol = Math.max(15, Math.min(250, Math.round(file.size / 75000)));
      setSimulatedVolumeCm3(simVol);
      setFileUploaded(true);
    }
  };

  const handleSendQuoteWhatsApp = () => {
    const text =
      `Hola Cubito3D! 👋 Quisiera cotizar una impresión 3D a medida:\n\n` +
      `📁 Archivo: ${fileName} (${fileSizeMb} MB)\n` +
      `🧪 Material: ${selectedMaterial} (${selectedColor})\n` +
      `⚙️ Relleno: ${infill}%\n` +
      `📐 Resolución de capa: ${layerHeight} mm\n` +
      `⚖️ Peso estimado: ~${estimatedGrams}g por unidad\n` +
      `🔢 Cantidad: ${quantity} unidad(es)\n` +
      `💰 Cotización estimada web: $${totalCost.toLocaleString('es-AR')}\n\n` +
      `¿Podrían confirmarme disponibilidad y tiempo de entrega? ¡Gracias!`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="servicios" className="py-24 bg-white dark:bg-slate-950 relative border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <p className="text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
            Servicios a Medida
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Impresión 3D Personalizada & Fabricación a Pedido
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Fabricamos tus diseños en cualquier formato (.STL, .OBJ, .STEP, .3MF). Configura tus parámetros técnicos en nuestra calculadora interactiva y obtén una cotización inmediata.
          </p>
        </div>

        {/* 2-Column Split: Estimator Tool (Left) & Workflow steps (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Estimator Tool (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl shadow-slate-200/50 dark:shadow-black/40">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Calculadora de Cotización en Tiempo Real
                </h3>
              </div>
              <span className="text-xs font-mono-tech text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800/60 px-2.5 py-1 rounded">
                v2.4 CoreXY / SLA
              </span>
            </div>

            {/* 1. File Upload Simulator */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                1. Archivo 3D (.STL, .OBJ, .STEP)
              </label>
              <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700/80 hover:border-cyan-500 rounded-xl p-5 text-center transition-colors bg-white dark:bg-slate-950/50">
                <input
                  type="file"
                  id={fileInputId}
                  accept=".stl,.obj,.step,.3mf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor={fileInputId}
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <UploadCloud className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Arrastra tu archivo aquí o <span className="text-cyan-600 dark:text-cyan-400 underline underline-offset-2">explora tu equipo</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Formatos soportados: STL, OBJ, STEP, 3MF (hasta 100 MB)
                  </p>
                </label>
              </div>

              {/* Active File Banner */}
              {fileUploaded && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 truncate">
                    <FileCode2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span className="font-mono-tech truncate">{fileName}</span>
                    <span className="text-slate-400 font-mono-tech">({fileSizeMb} MB)</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Malla analizada
                  </span>
                </div>
              )}
            </div>

            {/* 2. Material Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                2. Selecciona el Material
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(['PLA', 'PETG', 'ABS', 'TPU', 'Resina 8K'] as const).map((mat) => {
                  const isSelected = selectedMaterial === mat;
                  const info = materialData[mat];
                  return (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-500 dark:border-cyan-400 text-slate-950 dark:text-white shadow-sm'
                          : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold text-xs flex items-center justify-between">
                        <span>{mat}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {info.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Infill & Layer Height */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Infill */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">3. Relleno (Infill)</span>
                  <span className="font-mono-tech text-cyan-600 dark:text-cyan-400 font-bold">{infill}%</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[15, 25, 50, 100].map((val) => (
                    <button
                      key={val}
                      onClick={() => setInfill(val)}
                      className={`py-1.5 text-xs font-mono-tech rounded-lg border transition-colors ${
                        infill === val
                          ? 'bg-cyan-500 dark:bg-cyan-400 text-slate-950 font-bold border-cyan-500 dark:border-cyan-400'
                          : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-slate-500 block">
                  {infill <= 20 ? 'Visual / Maquetas' : infill <= 40 ? 'Estándar balanceado' : 'Esfuerzo mecánico alto'}
                </span>
              </div>

              {/* Layer Height */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">4. Altura de Capa</span>
                  <span className="font-mono-tech text-cyan-600 dark:text-cyan-400 font-bold">{layerHeight} mm</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { val: 0.28, label: '0.28 Rápido' },
                    { val: 0.20, label: '0.20 Normal' },
                    { val: 0.12, label: '0.12 Fino' },
                  ].map((res) => (
                    <button
                      key={res.val}
                      onClick={() => setLayerHeight(res.val)}
                      className={`py-1.5 text-xs font-mono-tech rounded-lg border transition-colors ${
                        layerHeight === res.val
                          ? 'bg-cyan-500 dark:bg-cyan-400 text-slate-950 font-bold border-cyan-500 dark:border-cyan-400'
                          : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {res.label}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-slate-500 block">
                  {layerHeight === 0.12 ? 'Máximo detalle visual' : 'Balance óptimo resistencia / tiempo'}
                </span>
              </div>
            </div>

            {/* 4. Color & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Color */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Color de Filamento / Resina
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Negro Mate">Negro Mate</option>
                  <option value="Blanco Nieve">Blanco Nieve</option>
                  <option value="Gris Titanio">Gris Titanio</option>
                  <option value="Rojo Carmesí">Rojo Carmesí</option>
                  <option value="Azul Cobalto">Azul Cobalto</option>
                  <option value="Translúcido Natural">Translúcido Natural</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Cantidad de Unidades
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center justify-center font-bold text-sm"
                  >
                    -
                  </button>
                  <div className="flex-1 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-center font-mono-tech text-sm font-semibold text-slate-900 dark:text-white">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center justify-center font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Summary & WhatsApp Action */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1 mb-1">
                    <Weight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Peso</span>
                  </div>
                  <div className="text-slate-900 dark:text-white font-mono-tech font-bold">~{estimatedGrams * quantity} g</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Tiempo est.</span>
                  </div>
                  <div className="text-slate-900 dark:text-white font-mono-tech font-bold">{Math.round(estimatedHours * quantity)} h</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1 mb-1">
                    <Wrench className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Resolución</span>
                  </div>
                  <div className="text-slate-900 dark:text-white font-mono-tech font-bold">{layerHeight} mm</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Total estimado ({quantity} un.)</div>
                  <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono-tech">
                    ${totalCost.toLocaleString('es-AR')} ARS
                  </div>
                  <div className="text-[11px] text-slate-500">*Sujeto a verificación final de la geometría</div>
                </div>

                <button
                  onClick={handleSendQuoteWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  Pedir Cotización por WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Additive Manufacturing Steps (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                El Proceso de Fabricación en Cubito3D
              </h3>

              <div className="space-y-5">
                {[
                  {
                    step: '01',
                    title: 'Envío y Análisis de Archivo 3D',
                    desc: 'Cargas tu archivo o nos contactas con tu idea. Verificamos que no existan errores de malla no-manifold o paredes menores al espesor mínimo.',
                  },
                  {
                    step: '02',
                    title: 'Optimización de Slicing',
                    desc: 'Configuramos la mejor orientación angular en la cama para optimizar la resistencia según el sentido de las fuerzas de uso.',
                  },
                  {
                    step: '03',
                    title: 'Impresión de Alta Precisión',
                    desc: 'Tu pieza se fabrica en impresoras calibradas con boquillas de carburo o resina 8K con monitoreo térmico en cámara cerrada.',
                  },
                  {
                    step: '04',
                    title: 'Post-Procesado y Control de Calidad',
                    desc: 'Retiro minucioso de soportes, curado UV de longitud de onda 405nm, verificación dimensional con calibre y empaque reforzado.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="font-mono-tech text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Design Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm flex items-center gap-2">
                <Info className="w-4 h-4" />
                ¿No tienes el archivo 3D listo?
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                ¡No te preocupes! Nuestro equipo de diseñadores industriales modela piezas a partir de planos en papel, fotografías con medidas o repuestos rotos.
              </p>
              <a
                href="#contacto"
                className="inline-block text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 underline underline-offset-4"
              >
                Consultar por servicio de modelado 3D →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
