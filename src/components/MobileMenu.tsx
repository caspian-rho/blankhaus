"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Sizing", href: "#sizing" },
  { label: "Consult", href: "#consult" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] -mr-2"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-5 h-[2px] bg-charcoal transition-all duration-300 ${
            open ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-charcoal transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-charcoal transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </button>

      {/* Fullscreen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal transition-all duration-500 md:hidden flex flex-col justify-center items-center ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-bone text-3xl font-black uppercase tracking-[0.15em] transition-all duration-500"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transitionDelay: open ? `${0.1 + i * 0.06}s` : "0s",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div
          className="absolute bottom-10 text-bone/30 text-[9px] tracking-[0.4em] uppercase text-center transition-all duration-500"
          style={{
            opacity: open ? 1 : 0,
            transitionDelay: open ? "0.4s" : "0s",
          }}
        >
          <p>Cut and Sewn Blanks</p>
          <p className="mt-1">Made in Los Angeles</p>
        </div>
      </div>
    </>
  );
}
