import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type TCartItemWithProductDetails } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateOrderAmount(cartItems: TCartItemWithProductDetails[]) {
  return cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
}
