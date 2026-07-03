const SIZES = {
  xs: 'h-7',
  sm: 'h-9',
  md: 'h-11',
  lg: 'h-14',
  xl: 'h-20',
  '2xl': 'h-28',
  hero: 'h-44 sm:h-52',
};

export default function Logo({ size = 'md', iconOnly = false, className = '' }) {
  const height = SIZES[size] || SIZES.md;
  const src = iconOnly ? '/octazen-icon.png' : '/octazen-logo.png';
  const alt = iconOnly ? 'Octazen' : 'Octazen Technologies LLP';

  return (
    <img
      src={src}
      alt={alt}
      className={`${height} w-auto object-contain shrink-0 ${className}`}
    />
  );
}
