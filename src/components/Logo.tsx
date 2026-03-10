import { Cormorant } from "next/font/google";

const calligraphic = Cormorant({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
  display: "swap",
});

interface LogoProps {
  className?: string;
  stacked?: boolean;
}

export default function Logo({ className = "", stacked = false }: LogoProps) {
  if (stacked) {
    return (
      <span className={`block leading-[0.85] select-none ${className}`}>
        <span
          className="block font-black lowercase tracking-[-0.02em]"
          style={{ fontFamily: '"Helvetica Neue", "Arial", sans-serif' }}
        >
          blank
        </span>
        <span
          className={`block lowercase ${calligraphic.className}`}
          style={{ fontSize: "0.85em", letterSpacing: "-0.01em" }}
        >
          haus
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-baseline leading-none select-none ${className}`}
    >
      <span
        className="font-black lowercase tracking-[-0.02em]"
        style={{ fontFamily: '"Helvetica Neue", "Arial", sans-serif' }}
      >
        blank
      </span>
      <span
        className={`lowercase ${calligraphic.className}`}
        style={{ fontSize: "1.15em", letterSpacing: "-0.01em" }}
      >
        haus
      </span>
    </span>
  );
}
