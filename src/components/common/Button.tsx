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
    'relative inline-flex items-center justify-center font-bold font-game select-none rounded-2xl transition-all duration-150 active:translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:shadow-none whitespace-nowrap cursor-pointer';

  const sizeStyles = {
    sm: 'text-sm px-3.5 py-1.5 min-h-[38px]',
    md: 'text-base px-5 py-2.5 min-h-[46px]',
    lg: 'text-lg px-6 py-3 min-h-[52px]',
    xl: 'text-xl px-8 py-4 min-h-[60px]',
  };

  const variantStyles = {
    primary:
      'bg-indigo-600 text-white shadow-[0_4px_0_0_#4338ca] hover:bg-indigo-500 active:shadow-[0_1px_0_0_#4338ca]',
    secondary:
      'bg-white text-slate-700 border-2 border-slate-200 shadow-[0_4px_0_0_#cbd5e1] hover:bg-slate-50 hover:border-slate-300 active:shadow-[0_1px_0_0_#cbd5e1]',
    success:
      'bg-emerald-500 text-white shadow-[0_4px_0_0_#059669] hover:bg-emerald-400 active:shadow-[0_1px_0_0_#059669]',
    amber:
      'bg-amber-500 text-white shadow-[0_4px_0_0_#d97706] hover:bg-amber-400 active:shadow-[0_1px_0_0_#d97706]',
    danger:
      'bg-rose-500 text-white shadow-[0_4px_0_0_#e11d48] hover:bg-rose-400 active:shadow-[0_1px_0_0_#e11d48]',
    ghost:
      'bg-transparent text-slate-600 hover:bg-slate-100/70 border border-transparent active:translate-y-0',
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
