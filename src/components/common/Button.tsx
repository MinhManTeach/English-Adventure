import React from 'react';
import { soundService } from '../../services/sound';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'amber';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  playSound?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  playSound = true,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (playSound) {
      soundService.playCoin();
    }
    onClick?.(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 font-extrabold font-display tracking-wide select-none rounded-2xl transition-[transform,background-color,border-color] duration-100 active:translate-y-[2px] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 whitespace-nowrap cursor-pointer';

  const sizeStyles = {
    sm: 'text-sm px-3.5 py-1.5 min-h-[38px]',
    md: 'text-base px-5 py-2.5 min-h-[46px]',
    lg: 'text-lg px-6 py-3 min-h-[52px]',
    xl: 'text-xl px-8 py-4 min-h-[60px]',
  };

  // Chunky "3D" buttons: a darker bottom border that shrinks when pressed.
  const variantStyles = {
    primary: 'bg-sky-brand text-white border-b-4 border-sky-brand-dark hover:brightness-105 active:border-b-2',
    secondary: 'bg-white text-ink border-2 border-line border-b-4 hover:bg-cloud active:border-b-2',
    success: 'bg-go text-white border-b-4 border-go-dark hover:brightness-105 active:border-b-2',
    amber: 'bg-flame text-white border-b-4 border-flame-dark hover:brightness-105 active:border-b-2',
    danger: 'bg-berry text-white border-b-4 border-berry-dark hover:brightness-105 active:border-b-2',
    ghost: 'bg-transparent text-ink-soft hover:bg-cloud border-2 border-transparent active:translate-y-0',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
