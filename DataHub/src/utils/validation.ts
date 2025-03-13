import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  price: z.number().min(1, { message: "Price must be at least 1" }),
  quantity: z.number().min(0, { message: "Quantity must be at least 0" }),
  categoryId: z.number().min(1, { message: "Category ID must be at least 1" }),
});
export const updateProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  price: z.number().min(1, { message: "Price must be at least 1" }),
  quantity: z.number().min(0, { message: "Quantity must be at least 0" }),
  categoryId: z.number().min(1, { message: "Category ID must be at least 1" }),
});

export const addCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
});
