import { Request, Response } from "express";
import { prisma } from "../db/client";
import { StandardResponse } from "../utils/standardResponse";
import { Prisma } from "@prisma/client";

//products with pagination, sorting, and filtering
export const getProducts = async (req: Request, res: Response) => {
  const {
    page = "1",
    limit = "10",
    sort = "id",
    order = "asc",
    categoryId,
  } = req.query as {
    page?: string;
    limit?: string;
    sort?: string;
    order?: string;
    categoryId?: string;
  };

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where: Prisma.ProductWhereInput = {};
  if (categoryId) {
    where.categoryId = Number(categoryId);
  }

  const products = await prisma.product.findMany({
    skip,
    take,
    where,
    orderBy: {
      [sort as keyof Prisma.ProductOrderByWithRelationInput]:
        order.toLowerCase() as Prisma.SortOrder,
    },
    include: {
      category: true,
    },
  });

  const total = await prisma.product.count({ where });

  res.status(200).json(
    new StandardResponse("Products fetched successfully", {
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    })
  );
};

//get a specific product
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  });

  if (!product) {
    res.status(404).json(new StandardResponse("Product not found"));
  }

  res
    .status(200)
    .json(new StandardResponse("Product fetched successfully", product));
};

// create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { name, description = "", price, quantity, categoryId } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      categoryId: Number(categoryId),
    },
  });

  res
    .status(201)
    .json(new StandardResponse("Product created successfully", product));
};

//update a product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, quantity, categoryId } = req.body;

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name,
      description,
      price: price ? Number(price) : undefined,
      quantity: quantity ? Number(quantity) : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
    },
  });

  res
    .status(200)
    .json(new StandardResponse("Product updated successfully", product));
};

//delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: { id: Number(id) },
  });

  res.status(200).json(new StandardResponse("Product deleted successfully"));
};

//find products with low inventory
export const getLowInventoryProducts = async (req: Request, res: Response) => {
  const { threshold = "10" } = req.query as { threshold?: string };

  const products = await prisma.product.findMany({
    where: {
      quantity: {
        lt: Number(threshold),
      },
    },
    include: {
      category: true,
    },
  });

  res
    .status(200)
    .json(
      new StandardResponse(
        "Low inventory products fetched successfully",
        products
      )
    );
};

// find most expensive products per category
export const getMostExpensiveProductsPerCategory = async (
  req: Request,
  res: Response
) => {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          price: "desc",
        },
        take: 1,
      },
    },
  });

  const result = categories.map((category) => ({
    category: category.name,
    product: category.products[0] ? category.products[0] : null,
  }));

  res
    .status(200)
    .json(
      new StandardResponse(
        "Most expensive products per category fetched successfully",
        result
      )
    );
};
