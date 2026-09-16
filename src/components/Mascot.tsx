import React from 'react';
import { AcademicOwl, type OwlVariant, type OwlSize } from './AcademicOwl';

interface MascotProps {
  className?: string;
  variant?: OwlVariant;
  size?: OwlSize;
}

export const Mascot: React.FC<MascotProps> = ({
  className = '',
  variant = 'explaining',
  size = 'lg',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <AcademicOwl variant={variant} size={size} />
    </div>
  );
};

