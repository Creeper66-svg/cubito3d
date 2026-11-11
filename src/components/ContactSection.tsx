import React, { useState } from 'react';
import { Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Instagram, Youtube, Linkedin } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_DISPLAY } from '../config/constants';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoProyecto: 'Impresión Personalizada',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.nombre || !formState.email || !formState.mensaje) return;

    setSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const text =
      `Hola Cubito3D! 👋\n` +
      `Mi nombre es ${formState.nombre || 'un cliente'}.\n` +
      `Tipo de consulta: ${formState.tipoProyecto}\n` +
      `Email de contacto: ${formState.email || 'No especificado'}\n\n` +
      `Mensaje: ${formState.mensaje || 'Quisiera recibir información sobre sus servicios de impresión 3D.'}`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="contacto" className="py-24 bg-slate-100/70 dark:bg-slate-900/60 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 space-y-3">
          <p className="text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
            Contacto Directo
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Hablemos de tu Próximo Proyecto 3D
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Estamos en línea para responder consultas, revisar archivos y asesorarte sin compromiso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {/* WhatsApp direct card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800/40 shadow-sm dark:shadow-none space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Atención Instantánea</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Canal directo con nuestros técnicos</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  ¿Necesitas una respuesta rápida o enviar un archivo para chequear viabilidad? Escríbenos por WhatsApp ahora mismo.
                </p>
                <a
                  href={getWhatsAppUrl('Hola Cubito3D, quiero hacerles una consulta')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chatear por WhatsApp ({WHATSAPP_DISPLAY})
                </a>
              </div>

              {/* Contact Information List */}
              <div className="space-y-4 p-6 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-900 dark:text-white font-medium">Taller & Punto de Retiro</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Av. Triunvirato 3850, Villa Urquiza, CABA, Argentina</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-900 dark:text-white font-medium">Correo Electrónico</div>
                    <a href="mailto:hola@cubito3d.com" className="text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                      hola@cubito3d.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-900 dark:text-white font-medium">Horario de Operaciones</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Lunes a Viernes: 09:00 a 19:00 hs · Sábados: 10:00 a 14:00 hs
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Síguenos en Redes Sociales
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    aria-label="Instagram de Cubito3D"
                  >
                    <Instagram className="w-4 h-4 text-pink-500" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    aria-label="Canal de YouTube de Cubito3D"
                  >
                    <Youtube className="w-4 h-4 text-red-500" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    aria-label="LinkedIn de Cubito3D"
                  >
                    <Linkedin className="w-4 h-4 text-blue-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl shadow-slate-200/50 dark:shadow-black/40">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">¡Mensaje Enviado con Éxito!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Gracias por contactar a Cubito3D. Un técnico de nuestro taller revisará tu solicitud y te responderá en menos de 2 horas hábiles.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        nombre: '',
                        email: '',
                        telefono: '',
                        tipoProyecto: 'Impresión Personalizada',
                        mensaje: '',
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  >
                    Enviar otra consulta
                  </button>
                  <button
                    onClick={handleSendViaWhatsApp}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Enviar copia a WhatsApp
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    Envíanos tu Consulta
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Completa el formulario y te enviaremos una cotización detallada.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Martín Gómez"
                      value={formState.nombre}
                      onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tunombre@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+54 9 3888 676575"
                      value={formState.telefono}
                      onChange={(e) => setFormState({ ...formState, telefono: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                      Tipo de Proyecto
                    </label>
                    <select
                      value={formState.tipoProyecto}
                      onChange={(e) => setFormState({ ...formState, tipoProyecto: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="Impresión Personalizada">Impresión Personalizada (tengo STL)</option>
                      <option value="Modelado CAD 3D">Modelado CAD 3D (no tengo archivo)</option>
                      <option value="Producción en Serie">Producción en Serie (&gt;20 unidades)</option>
                      <option value="Compra de Catálogo">Consulta sobre producto de catálogo</option>
                      <option value="Otro">Otro requerimiento especial</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Mensaje o Descripción de la Pieza *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Cuéntanos dimensiones aproximadas, cantidad, uso final (interior o exterior, esfuerzo mecánico) y cualquier detalle técnico relevante..."
                    value={formState.mensaje}
                    onChange={(e) => setFormState({ ...formState, mensaje: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Enviar Consulta al Taller
                  </button>

                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Abrir en WhatsApp directamente
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
