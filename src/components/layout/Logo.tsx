import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Glow effect behind shield */}
      <div className="relative">
        {/* Outer glow layers */}
        <div className="absolute inset-0 -m-3 rounded-full bg-amber/20 blur-xl" />
        <div className="absolute inset-0 -m-1.5 rounded-full bg-white/10 blur-md" />

        {/* Shield SVG */}
        <svg
          width="44"
          height="52"
          viewBox="0 0 44 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-[0_0_12px_rgba(212,168,83,0.5)]"
        >
          <defs>
            {/* Amber gold gradient */}
            <linearGradient
              id="shieldGradient"
              x1="22"
              y1="0"
              x2="22"
              y2="52"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#F5D78E" />
              <stop offset="50%" stopColor="#D4A853" />
              <stop offset="100%" stopColor="#B87333" />
            </linearGradient>

            {/* Lighter gradient for circuit lines */}
            <linearGradient
              id="circuitGradient"
              x1="10"
              y1="10"
              x2="34"
              y2="42"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#F5D78E" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D4A853" stopOpacity="0.3" />
            </linearGradient>

            {/* Inner glow filter */}
            <filter id="innerGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
              <feFlood floodColor="#F5D78E" floodOpacity="0.3" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Shield body */}
          <path
            d="M22 2L4 10V24C4 36 12 46 22 50C32 46 40 36 40 24V10L22 2Z"
            fill="#0D0D0D"
            stroke="url(#shieldGradient)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Inner shield border */}
          <path
            d="M22 6L8 12.5V24.5C8 34.2 14.5 42.5 22 46C29.5 42.5 36 34.2 36 24.5V12.5L22 6Z"
            fill="none"
            stroke="url(#circuitGradient)"
            strokeWidth="0.75"
            strokeLinejoin="round"
          />

          {/* Circuit pattern lines */}
          <g
            stroke="url(#circuitGradient)"
            strokeWidth="1"
            strokeLinecap="round"
            filter="url(#innerGlow)"
          >
            {/* Central vertical line */}
            <line x1="22" y1="12" x2="22" y2="40" />

            {/* Top horizontal branch */}
            <line x1="14" y1="18" x2="30" y2="18" />

            {/* Left diagonal branches */}
            <line x1="14" y1="18" x2="11" y2="22" />
            <line x1="11" y1="22" x2="11" y2="28" />
            <line x1="11" y1="28" x2="14" y2="31" />

            {/* Right diagonal branches */}
            <line x1="30" y1="18" x2="33" y2="22" />
            <line x1="33" y1="22" x2="33" y2="28" />
            <line x1="33" y1="28" x2="30" y2="31" />

            {/* Middle horizontal branch */}
            <line x1="14" y1="26" x2="22" y2="26" />
            <line x1="22" y1="26" x2="30" y2="26" />

            {/* Lower branches */}
            <line x1="16" y1="33" x2="22" y2="33" />
            <line x1="22" y1="33" x2="28" y2="33" />

            {/* Bottom convergence */}
            <line x1="14" y1="31" x2="18" y2="37" />
            <line x1="30" y1="31" x2="26" y2="37" />
          </g>

          {/* Circuit nodes (dots at intersections) */}
          <g fill="#F5D78E" filter="url(#innerGlow)">
            <circle cx="22" cy="12" r="1.5" />
            <circle cx="14" cy="18" r="1.5" />
            <circle cx="30" cy="18" r="1.5" />
            <circle cx="22" cy="18" r="1.5" />
            <circle cx="11" cy="22" r="1.2" />
            <circle cx="33" cy="22" r="1.2" />
            <circle cx="22" cy="26" r="1.5" />
            <circle cx="11" cy="28" r="1.2" />
            <circle cx="33" cy="28" r="1.2" />
            <circle cx="14" cy="31" r="1.2" />
            <circle cx="30" cy="31" r="1.2" />
            <circle cx="22" cy="33" r="1.5" />
            <circle cx="18" cy="37" r="1.2" />
            <circle cx="26" cy="37" r="1.2" />
            <circle cx="22" cy="40" r="1.5" />
          </g>

          {/* Center diamond accent */}
          <path
            d="M22 22L25 26L22 30L19 26Z"
            fill="url(#shieldGradient)"
            fillOpacity="0.4"
            stroke="#F5D78E"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Brand text */}
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          Backup Solutions
        </span>
        <span className="font-mono text-[10px] font-medium tracking-[0.3em] text-amber-light uppercase mt-0.5">
          LLC
        </span>
      </div>
    </div>
  );
};

export default Logo;
