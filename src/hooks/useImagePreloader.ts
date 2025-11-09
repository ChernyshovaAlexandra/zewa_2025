import { useEffect, useMemo } from 'react';

/**
 * Preloads provided public image URLs once the component is mounted.
 * Keeps the splashes/onboarding assets cached before navigation.
 */
export function useImagePreloader(imageUrls: readonly string[]) {
  const urls = useMemo(() => Array.from(new Set(imageUrls)), [imageUrls]);

  useEffect(() => {
    if (typeof window === 'undefined' || urls.length === 0) {
      return;
    }

    const images: HTMLImageElement[] = [];
    const timeoutId = window.setTimeout(() => {
      urls.forEach((src) => {
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        img.src = src;
        images.push(img);
      });
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [urls]);
}
