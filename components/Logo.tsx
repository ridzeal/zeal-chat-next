import Image from 'next/image';
import { brand } from '@/lib/brand';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src={brand.logo.src}
        alt={brand.logo.alt}
        width={brand.logo.width}
        height={brand.logo.height}
        className="rounded-lg"
      />
    </div>
  );
}