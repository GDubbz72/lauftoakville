import React from 'react';

interface CircleAccentProps {
  color?: string;
  stroke?: number;
  style?: React.CSSProperties;
}

export const CircleAccent = React.forwardRef<SVGSVGElement, CircleAccentProps>(
  ({ color = '#00ABEA', stroke = 5, style }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 300 110"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          ...style,
        }}
      >
        <path
          d="M 150 8 C 70 8, 18 32, 14 56 C 10 86, 90 102, 158 102 C 240 102, 290 84, 286 58 C 282 30, 220 12, 150 10"
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      </svg>
    );
  }
);

CircleAccent.displayName = 'CircleAccent';
