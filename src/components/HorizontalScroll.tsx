"use client";

import { useEffect, useRef, useState } from "react";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  // Mobile: horizontal snap scroll
  if (isMobile) {
    return (
      <div className={className}>
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -webkit-overflow-scrolling-touch">
          {children}
        </div>
      </div>
    );
  }

  // Desktop: scroll-jacked horizontal scroll
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
