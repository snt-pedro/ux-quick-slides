import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScaledSlide({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const el = wrapRef.current?.parentElement;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min(width / 1920, height / 1080));
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (wrapRef.current?.parentElement) ro.observe(wrapRef.current.parentElement);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "absolute",
        width: 1920,
        height: 1080,
        left: "50%",
        top: "50%",
        marginLeft: -960,
        marginTop: -540,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
}
