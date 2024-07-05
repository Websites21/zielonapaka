import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().trim().min(3).max(50),
  price: z.coerce.number().int().min(1).max(1000),
  description: z.string().trim().min(3).max(2000),
  imageURL: z.string().url().max(2048),
});
