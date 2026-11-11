export const WHATSAPP_NUMBER = '3888676575';
export const WHATSAPP_INTERNATIONAL = '5493888676575';
export const WHATSAPP_DISPLAY = '+54 9 3888 676575';

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_INTERNATIONAL}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
