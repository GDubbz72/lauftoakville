import React from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'outline-inv' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'default' | 'large' | 'xlarge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', fullWidth = false, children, className, ...props }, ref) => {
    const sizeClasses: Record<ButtonSize, string> = {
      small: 'px-5 py-2.5 text-xs',
      default: 'px-7 py-3.5 text-sm',
      large: 'px-9 py-4.5 text-sm',
      xlarge: 'px-11 py-5.5 text-base',
    };

    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-[var(--lauft-azure)] text-white border-[var(--lauft-azure)] hover:bg-[var(--lauft-bold-blue)] hover:border-[var(--lauft-bold-blue)]',
      outline: 'bg-white text-[var(--lauft-darkest-grey)] border-[var(--lauft-darkest-grey)] hover:bg-[var(--lauft-darkest-grey)] hover:text-white',
      'outline-inv': 'bg-transparent text-white border-white hover:bg-white hover:text-[var(--lauft-darkest-grey)]',
      secondary: 'bg-[var(--lauft-darkest-grey)] text-white border-[var(--lauft-darkest-grey)] hover:bg-[var(--lauft-bold-blue)] hover:border-[var(--lauft-bold-blue)]',
      ghost: 'bg-transparent text-[var(--lauft-darkest-grey)] border-transparent hover:text-[var(--lauft-azure)]',
    };

    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2 whitespace-nowrap
          font-lato font-bold uppercase tracking-wide rounded-full
          border border-solid transition-all duration-180
          hover:active:translate-y-0.5
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${fullWidth ? 'w-full' : ''}
          ${className || ''}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
