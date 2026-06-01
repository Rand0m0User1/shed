import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Override styling for pre-made elements
// e.g., button imported is blue; manual change to black
// will ensure that the button switches color to black
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
