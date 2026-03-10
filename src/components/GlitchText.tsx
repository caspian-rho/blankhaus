"use client";

import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`glitch-wrapper ${className}`}>
      <span className="relative inline-block">
        {text}
        {isGlitching && (
          <>
            <span
              className="absolute inset-0 text-inherit"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                transform: "translateX(-4px)",
                opacity: 0.8,
                color: "inherit",
              }}
              aria-hidden
            >
              {text}
            </span>
            <span
              className="absolute inset-0 text-inherit"
              style={{
                clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                transform: "translateX(4px)",
                opacity: 0.8,
                color: "inherit",
              }}
              aria-hidden
            >
              {text}
            </span>
          </>
        )}
      </span>
    </span>
  );
}
