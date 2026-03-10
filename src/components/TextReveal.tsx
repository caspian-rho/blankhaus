"use client";

import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  tag: Tag = "span",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden">
      <Tag
        className={className}
        style={{
          display: "block",
          transform: isVisible ? "translateY(0)" : "translateY(110%)",
          transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }}
      >
        {text}
      </Tag>
    </div>
  );
}
