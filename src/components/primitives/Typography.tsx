import React from 'react';

interface HeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
}

export const Headline = React.forwardRef<HTMLHeadingElement, HeadlineProps>(
  ({ size = 96, color = '#fff', align = 'left', as = 'h1', children, style, ...props }, ref) => {
    const Tag = as;
    return (
      <Tag
        ref={ref}
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 900,
          fontSize: size,
          lineHeight: 1.0,
          letterSpacing: '-0.015em',
          textTransform: 'uppercase',
          color,
          textAlign: align,
          margin: 0,
          ...style,
        }}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Headline.displayName = 'Headline';

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: number;
  transform?: string;
  children: React.ReactNode;
}

export const SectionHeading = React.forwardRef<HTMLHeadingElement, SectionHeadingProps>(
  ({ size = 40, color = '#1D252C', align = 'left', weight = 900, transform, children, style, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: weight,
          fontSize: size,
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          color,
          textAlign: align,
          margin: 0,
          textTransform: transform,
          ...style,
        }}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

SectionHeading.displayName = 'SectionHeading';

interface BodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: number;
  color?: string;
  weight?: number;
  children: React.ReactNode;
}

export const Body = React.forwardRef<HTMLParagraphElement, BodyProps>(
  ({ size = 16, color = '#1D252C', weight = 500, children, style, ...props }, ref) => {
    return (
      <p
        ref={ref}
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: weight,
          fontSize: size,
          lineHeight: 1.55,
          color,
          margin: 0,
          ...style,
        }}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Body.displayName = 'Body';

interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  children: React.ReactNode;
}

export const Eyebrow = React.forwardRef<HTMLDivElement, EyebrowProps>(
  ({ color = '#00ABEA', children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color,
          lineHeight: 1.5,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Eyebrow.displayName = 'Eyebrow';
