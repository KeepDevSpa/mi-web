'use client';

import { formatPrice } from '@/lib/utils';

interface PriceDisplayProps {
  price: number | null | undefined;
  showCurrency?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceDisplay({ 
  price, 
  showCurrency = true, 
  size = 'lg',
  className = ''
}: PriceDisplayProps) {
  const formatted = formatPrice(price);
  const [integerPart, decimalPart] = formatted.split(',');

  const sizeClasses = {
    sm: {
      container: 'flex items-baseline',
      integer: 'text-base font-bold leading-none',
      decimal: 'text-xs leading-none ml-0.5',
      suffix: 'text-xs text-gray-600 leading-none ml-1'
    },
    md: {
      container: 'flex items-baseline',
      integer: 'text-2xl font-bold leading-none',
      decimal: 'text-sm leading-none ml-0.5',
      suffix: 'text-sm text-gray-600 leading-none ml-1'
    },
    lg: {
      container: 'flex items-start justify-center',
      integer: 'text-5xl font-bold leading-none text-gray-900',
      decimal: 'text-lg leading-none text-gray-900 mt-1',
      suffix: 'text-sm text-gray-600 leading-none mt-1'
    }
  }[size];

  return (
    <div className={`${sizeClasses.container} ${className}`}>
      {size === 'lg' ? (
        <>
          <span className={sizeClasses.integer}>{integerPart}</span>
          <div className="flex flex-col items-start ml-1">
            <span className={sizeClasses.decimal}>,{decimalPart}</span>
            {showCurrency && <span className={sizeClasses.suffix}>€/mes</span>}
          </div>
        </>
      ) : (
        <>
          <span className={sizeClasses.integer}>{integerPart}</span>
          <span className={sizeClasses.decimal}>,{decimalPart}</span>
          {showCurrency && <span className={sizeClasses.suffix}>€/mes</span>}
        </>
      )}
    </div>
  );
}