"use client";

import { useEffect } from "react";

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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger / X button — always above overlay */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden relative z-[60] flex flex-col justify-center items-center w-11 h-11 -mr-2"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span
          className={`block w-5 h-[2px] transition-all duration-300 origin-center ${
            open
              ? "bg-bone rotate-45 translate-y-[0px]"
              : "bg-charcoal translate-y-[-4px]"
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-charcoal transition-all duration-300 ${
            open ? "opacity-0 scale-x-0" : "opacity-100"
          }`}
        />
        <span
          className={`block w-5 h-[2px] transition-all duration-300 origin-center ${
            open
              ? "bg-bone -rotate-45 translate-y-[0px]"
              : "bg-charcoal translate-y-[4px]"
          }`}
        />
      </button>

      {/* Fullscreen overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-charcoal md:hidden flex flex-col justify-center items-center transition-opacity duration-400 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
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
