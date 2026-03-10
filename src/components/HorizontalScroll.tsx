"use client";

import { useEffect, useRef } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function HorizontalScroll({
  children,
  className = "",
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (containerHeight - windowHeight))
      );
      const scrollWidth = inner.scrollWidth - window.innerWidth;
      inner.style.transform = `translateX(-${scrollProgress * scrollWidth}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div ref={innerRef} className="flex will-change-transform">
          {children}
        </div>
      </div>
    </div>
  );
}
