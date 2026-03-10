"use client";

import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import Counter from "@/components/Counter";
import HorizontalScroll from "@/components/HorizontalScroll";
import MobileMenu from "@/components/MobileMenu";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

export default function Home() {
  const mouse = useMousePosition();
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = [
    {
      name: "The Standard Tee",
      weight: "6.5oz",
      fit: "Boxy Fit",
      sizes: "S\u2013XL",
      price: "$12",
      bg: "plaster-texture",
      svg: (
        <svg viewBox="0 0 100 120" className="w-20 h-24 md:w-36 md:h-40 product-svg" fill="none" stroke="#0f0f0f" strokeWidth="1">
          <path d="M30 20 Q50 5 70 20 L75 50 Q75 55 70 55 L68 55 L68 110 L32 110 L32 55 L30 55 Q25 55 25 50 Z" className="animate-draw" />
          <path d="M30 20 L25 50" className="animate-draw" style={{ animationDelay: "0.3s" }} />
          <path d="M70 20 L75 50" className="animate-draw" style={{ animationDelay: "0.3s" }} />
          <line x1="32" y1="45" x2="68" y2="45" strokeDasharray="3 3" opacity="0.4" />
        </svg>
      ),
    },
    {
      name: "The Heavyweight Tee",
      weight: "8oz",
      fit: "Oversized",
      sizes: "S\u2013XL",
      price: "$15",
      bg: "concrete-texture bg-concrete",
      svg: (
        <svg viewBox="0 0 100 130" className="w-20 h-24 md:w-36 md:h-40 product-svg" fill="none" stroke="#0f0f0f" strokeWidth="1">
          <path d="M28 15 Q50 -2 72 15 L80 58 Q80 63 75 63 L72 63 L72 122 L28 122 L28 63 L25 63 Q20 63 20 58 Z" className="animate-draw" />
          <path d="M28 15 L20 58" className="animate-draw" style={{ animationDelay: "0.3s" }} />
          <path d="M72 15 L80 58" className="animate-draw" style={{ animationDelay: "0.3s" }} />
          <line x1="28" y1="50" x2="72" y2="50" strokeDasharray="3 3" opacity="0.4" />
        </svg>
      ),
    },
    {
      name: "The Crop Tee",
      weight: "6.5oz",
      fit: "Cropped Boxy",
      sizes: "S\u2013XL",
      price: "$13",
      bg: "bg-slab",
      svg: (
        <svg viewBox="0 0 100 100" className="w-20 h-24 md:w-36 md:h-40 product-svg" fill="none" stroke="#0f0f0f" strokeWidth="1">
          <path d="M30 20 Q50 5 70 20 L75 50 Q75 55 70 55 L68 55 L68 90 L32 90 L32 55 L30 55 Q25 55 25 50 Z" className="animate-draw" />
          <path d="M30 20 L25 50" className="animate-draw" style={{ animationDelay: "0.3s" }} />
          <path d="M70 20 L75 50" className="animate-draw" style={{ animationDelay: "0.3s" }} />
          <line x1="32" y1="85" x2="68" y2="85" strokeDasharray="2 2" opacity="0.3" />
        </svg>
      ),
    },
    {
      name: "The Long Sleeve",
      weight: "6.5oz",
      fit: "Relaxed",
      sizes: "S\u2013XL",
      price: "$16",
      bg: "plaster-texture",
      svg: (
        <svg viewBox="0 0 120 130" className="w-20 h-24 md:w-36 md:h-40 product-svg" fill="none" stroke="#0f0f0f" strokeWidth="1">
          <path d="M40 18 Q60 3 80 18 L95 55 L85 58 L78 40 L78 120 L42 120 L42 40 L35 58 L25 55 Z" className="animate-draw" />
          <line x1="42" y1="50" x2="78" y2="50" strokeDasharray="3 3" opacity="0.4" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-cream text-charcoal overflow-x-hidden">
      {/* Custom cursor follower — desktop only */}
      <div
        className="fixed w-3 h-3 border border-charcoal rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          left: mouse.x - 6,
          top: mouse.y - 6,
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b-[3px] border-charcoal"
        style={{
          backgroundColor: scrollY > 100 ? "rgba(216, 211, 201, 0.95)" : "transparent",
          backdropFilter: scrollY > 100 ? "blur(10px)" : "none",
          transition: "background-color 0.5s ease, backdrop-filter 0.5s ease",
        }}
      >
        <div className="flex items-center justify-between px-5 md:px-10 py-4">
          <a href="#" className="text-sm md:text-lg relative">
            <Logo />
          </a>
          {/* Desktop nav */}
          <div className="hidden md:flex gap-10 text-[11px] tracking-[0.25em] uppercase">
            {["About", "Products", "Sizing", "Consult"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            ))}
          </div>
          {/* Mobile hamburger */}
          <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85svh] md:min-h-[100svh] flex flex-col justify-center border-b-[3px] border-charcoal overflow-hidden plaster-texture">
        {/* Animated background shapes — desktop only */}
        <div className="hidden md:block absolute top-20 right-10 w-64 h-64 border border-charcoal/10 rounded-full animate-float" />
        <div
          className="hidden md:block absolute bottom-32 right-1/3 w-32 h-32 border border-charcoal/5"
          style={{ transform: `rotate(${scrollY * 0.05}deg)` }}
        />

        <div className="relative z-10 px-5 md:px-10 pt-20 md:pt-0">
          <div className="mb-4 md:mb-6">
            <p
              className={`text-[9px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase mb-3 md:mb-4 transition-all duration-1000 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Los Angeles, CA &mdash; Est. 2026
            </p>
            <div
              className={`w-10 md:w-16 h-[2px] bg-charcoal transition-all duration-1000 delay-200 ${
                loaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <h1 className="relative">
            {["CUT", "AND", "SEWN"].map((word, i) => (
              <div key={word} className="overflow-hidden">
                <span
                  className={`block text-[16vw] md:text-[11vw] leading-[0.82] md:leading-[0.85] tracking-[-0.03em] md:tracking-[-0.04em] uppercase font-black transition-all duration-[1.2s] ${
                    loaded ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{
                    transitionDelay: `${0.1 + i * 0.08}s`,
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {word}
                </span>
              </div>
            ))}
            <div className="overflow-hidden">
              <span
                className={`block text-[16vw] md:text-[11vw] leading-[0.82] md:leading-[0.85] tracking-[-0.03em] md:tracking-[-0.04em] uppercase font-black text-transparent transition-all duration-[1.2s] ${
                  loaded ? "translate-y-0" : "translate-y-full"
                }`}
                style={{
                  WebkitTextStroke: "1.5px #0f0f0f",
                  transitionDelay: "0.34s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                BLANKS
              </span>
            </div>
          </h1>

          <div
            className={`mt-6 md:mt-10 flex flex-col md:flex-row md:items-end gap-4 md:gap-20 transition-all duration-1000 delay-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase max-w-[240px] md:max-w-[260px] leading-[1.7] md:leading-[1.8]">
              Premium heavyweight blanks
              <br />
              for those who build brands
            </p>
            <div className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.35em] uppercase leading-[2]">
              <p>Made in Los Angeles</p>
              <p>Consultation &mdash; Austin, TX</p>
            </div>
          </div>
        </div>

        {/* Bottom indicators */}
        <div
          className={`absolute bottom-6 md:bottom-8 left-5 md:left-10 text-[9px] md:text-[10px] tracking-[0.3em] uppercase transition-all duration-1000 delay-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-[1px] h-5 md:h-6 bg-charcoal animate-pulse" />
            <p>Scroll</p>
          </div>
        </div>
        <div className="absolute bottom-6 md:bottom-8 right-5 md:right-10 text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-mono">
          001 / 005
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="border-b-[3px] border-charcoal bg-charcoal text-bone py-3 md:py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase mx-6 md:mx-20">
              CUT AND SEWN &bull; MADE IN LA &bull; HEAVYWEIGHT BLANKS &bull; PREMIUM QUALITY &bull;
            </span>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <section className="border-b-[3px] border-charcoal bg-concrete-dark text-bone">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { value: 6, suffix: ".5oz", label: "Fabric Weight" },
            { value: 48, suffix: "+", label: "Min. Order" },
            { value: 100, suffix: "%", label: "Made in USA" },
            { value: 4, suffix: "", label: "Blank Styles" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`p-5 md:p-10 text-center ${
                i % 2 === 0 ? "border-r-[3px] border-charcoal/30" : ""
              } ${i < 2 ? "border-b-[3px] md:border-b-0 border-charcoal/30" : ""} ${
                i === 2 ? "md:border-r-[3px] md:border-charcoal/30" : ""
              }`}
            >
              <p className="text-2xl md:text-5xl font-black tracking-tight">
                <Counter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase mt-1 md:mt-2 opacity-60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-b-[3px] border-charcoal">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left - Text */}
          <div className="p-6 py-10 md:p-16 lg:p-20 flex flex-col justify-center border-b-[3px] md:border-b-0 md:border-r-[3px] border-charcoal concrete-texture bg-bone relative overflow-hidden">
            <div className="hidden md:block absolute -right-8 -top-4 text-[20vw] font-black watermark leading-none select-none">
              02
            </div>

            <ScrollReveal>
              <p className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase mb-6 md:mb-10 text-charcoal/50">
                002 &mdash; About
              </p>
            </ScrollReveal>

            <TextReveal
              text="RAW"
              tag="h2"
              className="text-4xl md:text-7xl font-black uppercase leading-[0.85] tracking-tight"
            />
            <TextReveal
              text="MATERIAL."
              tag="h2"
              className="text-4xl md:text-7xl font-black uppercase leading-[0.85] tracking-tight"
              delay={0.1}
            />
            <div className="overflow-hidden mb-6 md:mb-10">
              <h2
                className="text-4xl md:text-7xl font-black uppercase leading-[0.85] tracking-tight text-transparent"
                style={{ WebkitTextStroke: "1.5px #0f0f0f" }}
              >
                YOUR VISION.
              </h2>
            </div>

            <ScrollReveal delay={0.2}>
              <p className="text-[13px] md:text-[15px] leading-[1.8] md:leading-[1.9] max-w-md mb-4 md:mb-6 text-charcoal/80">
                We don&apos;t make clothes. We make the canvas. Heavyweight, cut-and-sewn
                t-shirt blanks manufactured in Los Angeles for brands that refuse
                to compromise on quality.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-[13px] md:text-[15px] leading-[1.8] md:leading-[1.9] max-w-md text-charcoal/80">
                Every blank is constructed from premium fabrics, cut to spec, and
                sewn with intention. No shortcuts. No overseas middlemen. Just raw,
                American-made product ready for your label.
              </p>
            </ScrollReveal>
          </div>

          {/* Right - Visual grid */}
          <div className="grid grid-cols-2 grid-rows-2">
            {[
              { bg: "bg-charcoal", text: "text-bone", lines: ["6.5oz", "Heavyweight", "Cotton"] },
              { bg: "bg-concrete", text: "text-charcoal", lines: ["Cut &", "Sewn", "Construction"] },
              { bg: "bg-slab", text: "text-charcoal", lines: ["Made", "in", "Los Angeles"] },
              { bg: "bg-charcoal", text: "text-bone", lines: ["Low", "Minimums", "Available"] },
            ].map((cell, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`aspect-square ${cell.bg} flex items-center justify-center p-4 md:p-6 group cursor-default`}>
                  <p className={`${cell.text} text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.35em] uppercase text-center leading-[2.2] md:leading-[2.5] md:group-hover:tracking-[0.5em] transition-all duration-500`}>
                    {cell.lines.map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < cell.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products">
        <div className="p-6 py-10 md:p-16 lg:p-20 border-b-[3px] border-charcoal concrete-texture bg-cream relative overflow-hidden">
          <div className="hidden md:block absolute -right-4 -top-8 text-[25vw] font-black watermark leading-none select-none">
            03
          </div>
          <ScrollReveal>
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase mb-6 md:mb-8 text-charcoal/50">
              003 &mdash; Products
            </p>
          </ScrollReveal>
          <TextReveal
            text="THE BLANKS"
            tag="h2"
            className="text-4xl md:text-8xl font-black uppercase leading-[0.85] tracking-tight"
          />
        </div>

        <HorizontalScroll className="border-b-[3px] border-charcoal">
          {products.map((product, i) => (
            <div
              key={product.name}
              className="flex-shrink-0 w-[82vw] md:w-[40vw] h-auto md:h-screen border-r-[3px] border-charcoal product-card snap-start"
            >
              <div className={`h-[55vw] md:h-[65%] ${product.bg} relative flex items-center justify-center`}>
                <div className="w-32 h-40 md:w-56 md:h-64 border-[1.5px] border-charcoal/30 flex items-center justify-center bg-bone/40 backdrop-blur-sm">
                  {product.svg}
                </div>
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <p className="text-[8px] md:text-[9px] tracking-[0.5em] uppercase text-charcoal/40 font-mono">
                    00{i + 1}
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                  <p className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-charcoal/40">
                    {product.weight}
                  </p>
                </div>
              </div>
              <div className="p-5 md:p-10 md:h-[35%] flex flex-col justify-between border-t-[3px] border-charcoal bg-bone concrete-texture">
                <div>
                  <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight mb-1 md:mb-2">
                    {product.name}
                  </h3>
                  <p className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.35em] uppercase text-charcoal/50 mb-3 md:mb-4">
                    {product.weight} &bull; {product.fit} &bull; {product.sizes}
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-xl md:text-3xl font-black">
                    {product.price}
                    <span className="text-[10px] md:text-xs font-normal tracking-wide text-charcoal/50 ml-1">
                      /unit
                    </span>
                  </p>
                  <span className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase border-b border-charcoal pb-1 cursor-pointer">
                    Specs &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </HorizontalScroll>

        {/* Mobile scroll hint */}
        <div className="md:hidden flex justify-center py-3 border-b-[3px] border-charcoal bg-bone">
          <p className="text-[8px] tracking-[0.4em] uppercase text-charcoal/30">
            Swipe to browse &rarr;
          </p>
        </div>
      </section>

      {/* Reverse Marquee */}
      <div className="border-b-[3px] border-charcoal bg-bone py-3 md:py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-reverse">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase mx-6 md:mx-20 font-black">
              NO SHORTCUTS &bull; NO COMPROMISES &bull; NO OVERSEAS &bull; JUST RAW PRODUCT &bull;
            </span>
          ))}
        </div>
      </div>

      {/* Size Chart Section */}
      <section id="sizing" className="border-b-[3px] border-charcoal concrete-texture bg-cream relative overflow-hidden">
        <div className="hidden md:block absolute -left-8 -top-4 text-[25vw] font-black watermark leading-none select-none">
          04
        </div>
        <div className="p-6 py-10 md:p-16 lg:p-20 relative z-10">
          <ScrollReveal>
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase mb-6 md:mb-8 text-charcoal/50">
              004 &mdash; Sizing
            </p>
          </ScrollReveal>
          <TextReveal
            text="SIZE CHART"
            tag="h2"
            className="text-4xl md:text-8xl font-black uppercase leading-[0.85] tracking-tight"
          />
          <ScrollReveal delay={0.1}>
            <p className="text-[10px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em] uppercase text-charcoal/50 mb-10 md:mb-16 mt-3 md:mt-4">
              The Standard Tee &mdash; Boxy Fit
            </p>
          </ScrollReveal>

          {/* Size Chart Table */}
          <ScrollReveal delay={0.2}>
            <div className="max-w-2xl overflow-x-auto">
              <div className="border-[3px] border-charcoal min-w-[320px]">
                {/* Header */}
                <div className="grid grid-cols-4 bg-charcoal text-bone">
                  {["Size", "Shoulder", "Pit to Pit", "Length"].map((h) => (
                    <div key={h} className="p-3 md:p-6 text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase font-bold text-center first:text-left">
                      {h}
                    </div>
                  ))}
                </div>
                {/* Rows */}
                {[
                  { size: "S", sizeFull: "Small", shoulder: '20"', pit: '20"', length: '24"' },
                  { size: "M", sizeFull: "Medium", shoulder: '20"', pit: '21"', length: '25"' },
                  { size: "L", sizeFull: "Large", shoulder: '21"', pit: '22"', length: '26"' },
                  { size: "XL", sizeFull: "X-Large", shoulder: '21"', pit: '23"', length: '26.5"' },
                ].map((row, index) => (
                  <div
                    key={row.size}
                    className={`grid grid-cols-4 size-row ${
                      index !== 3 ? "border-b-[2px] border-charcoal/20" : ""
                    }`}
                  >
                    <div className="p-3 md:p-6 text-xs md:text-sm tracking-[0.1em] md:tracking-[0.15em] uppercase font-bold">
                      <span className="md:hidden">{row.size}</span>
                      <span className="hidden md:inline">{row.sizeFull}</span>
                    </div>
                    <div className="p-3 md:p-6 text-xs md:text-sm text-center font-mono">
                      {row.shoulder}
                    </div>
                    <div className="p-3 md:p-6 text-xs md:text-sm text-center font-mono">
                      {row.pit}
                    </div>
                    <div className="p-3 md:p-6 text-xs md:text-sm text-center font-mono">
                      {row.length}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase mt-6 md:mt-8 text-charcoal/30">
              All measurements in inches &bull; Tolerance &plusmn;0.5&quot; &bull; Pre-shrunk
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consult" className="border-b-[3px] border-charcoal">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left */}
          <div className="bg-charcoal text-bone p-6 py-10 md:p-16 lg:p-20 flex flex-col justify-between min-h-[60vh] md:min-h-[75vh] border-b-[3px] md:border-b-0 md:border-r-[3px] border-charcoal relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "radial-gradient(circle at 30% 40%, white 0%, transparent 50%), radial-gradient(circle at 70% 80%, white 0%, transparent 40%)"
            }} />

            <div className="relative z-10">
              <ScrollReveal>
                <p className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase mb-6 md:mb-10 text-bone/40">
                  005 &mdash; Consultation
                </p>
              </ScrollReveal>

              <TextReveal
                text="BOOK A"
                tag="h2"
                className="text-4xl md:text-7xl font-black uppercase leading-[0.85] tracking-tight"
              />
              <div className="overflow-hidden mb-6 md:mb-10">
                <h2
                  className="text-4xl md:text-7xl font-black uppercase leading-[0.85] tracking-tight text-transparent"
                  style={{ WebkitTextStroke: "1.5px #e0dbd2" }}
                >
                  CONSULTATION
                </h2>
              </div>

              <ScrollReveal delay={0.2}>
                <p className="text-[13px] md:text-sm leading-[1.8] md:leading-[1.9] max-w-md text-bone/60">
                  Meet with us in person at our Austin, TX showroom. See the
                  product, feel the weight, discuss your vision. We work directly
                  with emerging and established brands to bring their blanks to
                  life.
                </p>
              </ScrollReveal>
            </div>

            <div className="space-y-5 md:space-y-8 relative z-10 mt-8 md:mt-0">
              {[
                { label: "Manufacturing", value: "Los Angeles, CA" },
                { label: "In-Person Consultation", value: "Austin, TX" },
                { label: "Hours", value: "By Appointment Only" },
              ].map((item, i) => (
                <ScrollReveal key={item.label} delay={0.1 * i}>
                  <div>
                    <p className="text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-bone/30 mb-1 md:mb-2">
                      {item.label}
                    </p>
                    <p className="text-[13px] md:text-sm tracking-[0.1em] md:tracking-[0.15em] uppercase">
                      {item.value}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="p-6 py-10 md:p-16 lg:p-20 flex flex-col justify-center bg-bone concrete-texture">
            <ScrollReveal>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 md:mb-10">
                GET IN TOUCH
              </h3>
            </ScrollReveal>
            <form className="space-y-6 md:space-y-8">
              {[
                { label: "Brand Name", type: "text", placeholder: "Your brand" },
                { label: "Email", type: "email", placeholder: "you@brand.com" },
                { label: "Quantity (units)", type: "text", placeholder: "Minimum 48 units" },
              ].map((field, i) => (
                <ScrollReveal key={field.label} delay={0.1 + i * 0.08}>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase mb-2 md:mb-3 text-charcoal/50">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      className="form-input w-full bg-transparent border-b-[2px] border-charcoal/20 pb-3 text-sm tracking-wide focus:outline-none focus:border-charcoal placeholder:text-charcoal/20"
                      placeholder={field.placeholder}
                    />
                  </div>
                </ScrollReveal>
              ))}
              <ScrollReveal delay={0.4}>
                <div>
                  <label className="block text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase mb-2 md:mb-3 text-charcoal/50">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    className="form-input w-full bg-transparent border-b-[2px] border-charcoal/20 pb-3 text-sm tracking-wide focus:outline-none focus:border-charcoal placeholder:text-charcoal/20 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.5}>
                <button
                  type="submit"
                  className="shimmer-btn bg-charcoal text-bone px-8 md:px-10 py-4 md:py-5 text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase w-full md:w-auto border-[2px] border-charcoal active:bg-transparent active:text-charcoal md:hover:bg-transparent md:hover:text-charcoal transition-all duration-500"
                >
                  Request Consultation
                </button>
              </ScrollReveal>
            </form>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-b-[3px] border-charcoal bg-concrete concrete-texture">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { num: "01", title: "CONSULT", desc: "Meet in Austin. Discuss your needs, feel the fabric, review specs." },
            { num: "02", title: "SAMPLE", desc: "We produce sample blanks to your exact specifications." },
            { num: "03", title: "PRODUCE", desc: "Full production run in our Los Angeles facility." },
            { num: "04", title: "DELIVER", desc: "Blanks ship direct. Ready for your label, your print, your brand." },
          ].map((step, index) => (
            <ScrollReveal key={step.num} delay={index * 0.1}>
              <div
                className={`process-step p-5 md:p-10 lg:p-12 min-h-[180px] md:min-h-[320px] flex flex-col justify-between cursor-default ${
                  index % 2 === 0 ? "border-r-[3px] border-charcoal" : ""
                } ${index < 2 ? "border-b-[3px] md:border-b-0 border-charcoal" : ""} ${
                  index === 2 ? "md:border-r-[3px] md:border-charcoal" : ""
                }`}
              >
                <p className="text-4xl md:text-8xl font-black opacity-[0.08] mb-3 md:mb-4">
                  {step.num}
                </p>
                <div>
                  <h3 className="text-sm md:text-xl font-black uppercase tracking-tight mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[10px] md:text-xs leading-[1.6] md:leading-[1.8] opacity-60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Large text break */}
      <section className="border-b-[3px] border-charcoal bg-charcoal text-bone py-14 md:py-32 px-5 md:px-10 overflow-hidden">
        <ScrollReveal>
          <p className="text-[7vw] md:text-[5vw] font-black uppercase leading-[1.15] md:leading-[1.1] tracking-tight text-center">
            YOUR BRAND.
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #e0dbd2" }}>
              OUR BLANKS.
            </span>
            <br />
            <span className="text-bone/30">NO COMPROMISE.</span>
          </p>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-bone relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, white 0%, transparent 60%), radial-gradient(circle at 80% 70%, white 0%, transparent 40%)"
        }} />

        <div className="relative z-10 p-6 py-10 md:p-16 lg:p-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <ScrollReveal>
                <div className="mb-4 md:mb-8">
                  <Logo stacked className="text-4xl md:text-6xl" />
                </div>
                <p className="text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-bone/30 leading-[2]">
                  Cut and Sewn Blanks
                  <br />
                  Made in Los Angeles
                </p>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal delay={0.1}>
                <p className="text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-bone/30 mb-4 md:mb-6">
                  Navigation
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-3 md:flex-col md:space-y-4 md:gap-0">
                  {["About", "Products", "Sizing", "Consultation"].map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase().replace("ation", "")}`}
                      className="block text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase nav-link w-fit py-1"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal delay={0.2}>
                <p className="text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-bone/30 mb-4 md:mb-6">
                  Contact
                </p>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase">info@blankhaus.com</p>
                  <p className="text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase text-bone/60">
                    Austin, TX &mdash; By Appointment
                  </p>
                  <p className="text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase text-bone/60">
                    Los Angeles, CA &mdash; Production
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <div className="mt-12 md:mt-20 pt-6 md:pt-8 border-t border-bone/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
            <p className="text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-bone/20">
              &copy; 2026 Blankhaus. All rights reserved.
            </p>
            <p className="text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-bone/20">
              No shortcuts. No compromises. Just blanks.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
