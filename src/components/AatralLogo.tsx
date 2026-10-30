import React from 'react';

interface AatralLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'color' | 'white';
}

export default function AatralLogo({ size = 'md', variant = 'color', className = '' }: AatralLogoProps) {
  const heightMap = {
    sm: 34,
    md: 46,
    lg: 60,
  };

  const height = heightMap[size] || 46;
  const logoSrc = variant === 'white' ? '/logo-white.png' : '/logo.png';

  return (
    <div
      className={`aatral-logo-wrap ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        userSelect: 'none',
      }}
    >
      <img
        src={logoSrc}
        alt="Aatral Studios"
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}

// Standalone vector Icon mark for spots needing just the staircase icon
export function AatralIconMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Column 1 - 1 bottom block */}
      <rect x="5" y="65" width="24" height="24" rx="6" fill="#2563EB" />
      {/* Column 2 - 2 blocks */}
      <rect x="37" y="37" width="24" height="24" rx="6" fill="#2563EB" />
      <rect x="37" y="65" width="24" height="24" rx="6" fill="#2563EB" />
      {/* Column 3 - 3 blocks (top is vibrant lime green #84CC16) */}
      <rect x="69" y="9" width="24" height="24" rx="6" fill="#84CC16" />
      <rect x="69" y="37" width="24" height="24" rx="6" fill="#2563EB" />
      <rect x="69" y="65" width="24" height="24" rx="6" fill="#2563EB" />
    </svg>
  );
}
