import React, { useState, useEffect } from 'react';
import { Box } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string | string[];
  fallbackTitle?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Pieza 3D Cubito3D',
  className = '',
  fallbackSrc,
  fallbackTitle,
  ...props
}) => {
  // Construir la lista completa de fuentes alternativas
  const fallbackList = Array.isArray(fallbackSrc)
    ? fallbackSrc
    : fallbackSrc
    ? [fallbackSrc]
    : [];

  const candidateSources = [src, ...fallbackList].filter(
    (s): s is string => typeof s === 'string' && s.trim().length > 0
  );

  // Evitar duplicados preservando el orden de prioridad
  const uniqueSources = candidateSources.filter(
    (item, index) => candidateSources.indexOf(item) === index
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setHasFailedAll(uniqueSources.length === 0);
  }, [src]);

  const handleError = () => {
    if (currentIndex + 1 < uniqueSources.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setHasFailedAll(true);
    }
  };

  const activeSrc = uniqueSources[currentIndex];

  if (hasFailedAll || !activeSrc) {
    return (
      <div className={`w-full h-full min-h-[140px] bg-slate-900 flex flex-col items-center justify-center p-4 text-center border border-slate-800 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="relative z-10 w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 mb-2 shadow-sm">
          <Box className="w-5 h-5 animate-pulse" />
        </div>
        <span className="relative z-10 text-xs font-semibold text-slate-300 line-clamp-1">
          {fallbackTitle || alt}
        </span>
        <span className="relative z-10 text-[10px] text-cyan-500 font-mono-tech mt-0.5">
          Taller Cubito3D · Precisión 3D
        </span>
      </div>
    );
  }

  return (
    <img
      src={activeSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
      {...props}
    />
  );
};
