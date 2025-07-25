import { useEffect, useRef, useState } from 'react';

export function useContainerSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const resize = () => {
      setSize({
        width: el.clientWidth > 360 ? 360 : el.clientWidth,
        height: el.clientHeight,
      });
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, ...size };
}
