// Simple class name merge utility
export function cn(...args) {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .join(' ');
}