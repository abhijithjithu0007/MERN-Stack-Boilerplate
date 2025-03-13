import { Router } from "express";
import * as ProductController from "../controllers/productController";
import * as CategoryController from "../controllers/categoryController";
import { validateData } from "../middleware/zodValidation";
import { errorCatch } from "../utils/errors/errorCatch";
import {
  addCategorySchema,
  createProductSchema,
  updateProductSchema,
} from "../utils/validation";

const router = Router();

router.get("/products", errorCatch(ProductController.getProducts));
router.get(
  "/products/low-inventory",
  errorCatch(ProductController.getLowInventoryProducts)
);
router.get("/products/:id", errorCatch(ProductController.getProductById));
router.post(
  "/products",
  validateData(createProductSchema),
  errorCatch(ProductController.createProduct)
);
router.put(
  "/products/:id",
  validateData(updateProductSchema),
  errorCatch(ProductController.updateProduct)
);
router.delete("/products/:id", errorCatch(ProductController.deleteProduct));

router.get("/categories", errorCatch(CategoryController.getCategories));
router.get("/categories/:id", errorCatch(CategoryController.getCategoryById));
router.post(
  "/categories",
  validateData(addCategorySchema),
  errorCatch(CategoryController.createCategory)
);
router.put(
  "/categories/:id",
  validateData(addCategorySchema),
  errorCatch(CategoryController.updateCategory)
);
router.delete("/categories/:id", errorCatch(CategoryController.deleteCategory));
router.get(
  "/reports/most-expensive",
  errorCatch(ProductController.getMostExpensiveProductsPerCategory)
);

export default router;
