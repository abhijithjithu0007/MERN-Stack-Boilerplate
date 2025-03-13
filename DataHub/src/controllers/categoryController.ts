import { Request, Response } from "express";
import { prisma } from "../db/client";
import { StandardResponse } from "../utils/standardResponse";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  res
    .status(200)
    .json(new StandardResponse("Categories fetched successfully", categories));
};

//get a specific category with associated products
export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
    include: { products: true },
  });

  if (!category) {
    res.status(404).json(new StandardResponse("Category not found"));
  }

  res
    .status(200)
    .json(new StandardResponse("Category fetched successfully", category));
};

// create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const category = await prisma.category.create({
    data: {
      name,
      description,
    },
  });

  res
    .status(201)
    .json(new StandardResponse("Category created successfully", category));
};

// update a category
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const category = await prisma.category.update({
    where: { id: Number(id) },
    data: {
      name,
      description,
    },
  });

  res
    .status(200)
    .json(new StandardResponse("Category updated successfully", category));
};

//delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.category.delete({
    where: { id: Number(id) },
  });

  res.status(200).json(new StandardResponse("Category deleted successfully"));
};
