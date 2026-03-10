"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const links = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Sizing", href: "#sizing" },
  { label: "Consult", href: "#consult" },
];

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const overlay = (
    <div
      className="fixed inset-0 z-[55] md:hidden flex flex-col justify-center items-center"
      style={{
        backgroundColor: "var(--color-charcoal)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <nav className="flex flex-col items-center gap-8">
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-bone text-3xl font-black uppercase tracking-[0.15em]"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: open ? `${0.15 + i * 0.05}s` : "0s",
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div
        className="absolute bottom-10 text-bone/30 text-[9px] tracking-[0.4em] uppercase text-center"
        style={{
          opacity: open ? 1 : 0,
          transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: open ? "0.4s" : "0s",
        }}
      >
        <p>Cut and Sewn Blanks</p>
        <p className="mt-1">Made in Los Angeles</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger / X button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden relative z-[60] w-11 h-11 -mr-2 flex items-center justify-center"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <span
            className="absolute w-5 h-[2px]"
            style={{
              backgroundColor: open ? "var(--color-bone)" : "var(--color-charcoal)",
              transform: open ? "rotate(45deg)" : "translateY(-4px)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            className="absolute w-5 h-[2px]"
            style={{
              backgroundColor: open ? "var(--color-bone)" : "var(--color-charcoal)",
              opacity: open ? 0 : 1,
              transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            className="absolute w-5 h-[2px]"
            style={{
              backgroundColor: open ? "var(--color-bone)" : "var(--color-charcoal)",
              transform: open ? "rotate(-45deg)" : "translateY(4px)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      </button>

      {/* Portal the overlay to document.body so it escapes nav stacking context */}
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
