import { Router } from "express";
import { validateAccess, validateFields, validateJwt } from "src/middleware";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  findProductsPaginated,
} from "src/controller";
import {
  createProductValidationRules,
  deleteProductValidationRules,
  findProductsPaginatedValidationRules,
  findProductValidationRules,
  updateProductValidationRules,
} from "src/rules";

export class ProductRouter {
  static get routes(): Router {
    const router = Router();

    /**
     * @swagger
     * /api/product/store:
     *   post:
     *     summary: Create a new product
     *     tags: [Product]
     *     security:
     *      - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *          application/json:
     *            schema:
     *              type: object
     *              required:
     *                - name
     *                - unitPrice
     *                - stock
     *              properties:
     *                name:
     *                  type: string
     *                  description: Product name
     *                  example: "iPhone 13 Pro"
     *                description:
     *                  type: string
     *                  description: Product description
     *                  example: "Latest iPhone model with advanced features"
     *                unitPrice:
     *                  type: number
     *                  description: Product unit price
     *                  example: 999.99
     *                stock:
     *                  type: integer
     *                  description: Available stock quantity
     *                  example: 100
     *                sku:
     *                  type: string
     *                  description: Stock Keeping Unit
     *                  example: "IP13P-256-BLK"
     *                category:
     *                  type: string
     *                  description: Product category
     *                  example: "Electronics"
     *                attributes:
     *                  type: object
     *                  description: Additional product attributes
     *                  example: {"color": "black", "storage": "256GB"}
     *     responses:
     *       200:
     *         description: Product created successfully
     *         content:
     *           application/json:
     *             example:
     *               statusCode: 200
     *               id: "550e8400-e29b-41d4-a716-446655440000"
     *       400:
     *         description: Invalid product data
     *       401:
     *         description: Unauthorized
     *       422:
     *         $ref: '#/components/responses/FieldException'
     *       500:
     *         $ref: '#/components/responses/InternalException'
     */
    router.post(
      "/store",
      validateJwt,
      createProductValidationRules(),
      validateFields,
      createProduct,
    );

    /**
     * @swagger
     * /api/product/findPaginated:
     *   get:
     *     summary: Get paginated list of products
     *     tags: [Product]
     *     security:
     *      - BearerAuth: []
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *         description: Page number
     *         example: 1
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *         description: Items per page
     *         example: 10
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         description: Search term
     *         example: "iPhone"
     *     responses:
     *       200:
     *         description: List of products retrieved successfully
     *         content:
     *           application/json:
     *             example:
     *               statusCode: 200
     *               data: [
     *                 {
     *                   "id": "550e8400-e29b-41d4-a716-446655440000",
     *                   "name": "iPhone 13 Pro",
     *                   "description": "Latest iPhone model",
     *                   "unitPrice": 999.99,
     *                   "stock": 100
     *                 }
     *               ]
     *               total: 1
     *               page: 1
     *               limit: 10
     *       401:
     *         description: Unauthorized
     *       422:
     *         $ref: '#/components/responses/FieldException'
     *       500:
     *         $ref: '#/components/responses/InternalException'
     */
    router.get(
      "/findPaginated",
      validateJwt,
      findProductsPaginatedValidationRules(),
      validateFields,
      findProductsPaginated,
    );

    /**
     * @swagger
     * /api/product/findById/{id}:
     *   get:
     *     summary: Get product by ID
     *     tags: [Product]
     *     security:
     *      - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Product ID
     *         example: "550e8400-e29b-41d4-a716-446655440000"
     *     responses:
     *       200:
     *         description: Product retrieved successfully
     *         content:
     *           application/json:
     *             example:
     *               statusCode: 200
     *               data: {
     *                 "id": "550e8400-e29b-41d4-a716-446655440000",
     *                 "name": "iPhone 13 Pro",
     *                 "description": "Latest iPhone model",
     *                 "unitPrice": 999.99,
     *                 "stock": 100
     *               }
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Product not found
     *       422:
     *         $ref: '#/components/responses/FieldException'
     *       500:
     *         $ref: '#/components/responses/InternalException'
     */
    router.get(
      "/findById/:id",
      validateJwt,
      findProductValidationRules(),
      validateFields,
      findProductById,
    );

    /**
     * @swagger
     * /api/product/update:
     *   put:
     *     summary: Update an existing product
     *     tags: [Product]
     *     security:
     *      - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *          application/json:
     *            schema:
     *              type: object
     *              required:
     *                - id
     *              properties:
     *                id:
     *                  type: string
     *                  description: Product ID
     *                  example: "550e8400-e29b-41d4-a716-446655440000"
     *                name:
     *                  type: string
     *                  description: Product name
     *                  example: "iPhone 13 Pro"
     *                description:
     *                  type: string
     *                  description: Product description
     *                  example: "Latest iPhone model with advanced features"
     *                unitPrice:
     *                  type: number
     *                  description: Product unit price
     *                  example: 999.99
     *                stock:
     *                  type: integer
     *                  description: Available stock quantity
     *                  example: 100
     *                isAvailable:
     *                  type: boolean
     *                  description: Product availability status
     *                  example: true
     *     responses:
     *       200:
     *         description: Product updated successfully
     *         content:
     *           application/json:
     *             example:
     *               statusCode: 200
     *               message: "Product updated successfully"
     *       400:
     *         description: Invalid product data
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Product not found
     *       422:
     *         $ref: '#/components/responses/FieldException'
     *       500:
     *         $ref: '#/components/responses/InternalException'
     */
    router.put(
      "/update",
      validateJwt,
      updateProductValidationRules(),
      validateFields,
      updateProduct,
    );

    /**
     * @swagger
     * /api/product/delete/{id}:
     *   delete:
     *     summary: Delete a product
     *     tags: [Product]
     *     security:
     *      - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Product ID
     *         example: "550e8400-e29b-41d4-a716-446655440000"
     *     responses:
     *       200:
     *         description: Product deleted successfully
     *         content:
     *           application/json:
     *             example:
     *               statusCode: 200
     *               message: "Product deleted successfully"
     *       401:
     *         description: Unauthorized
     *       403:
     *         description: Forbidden - Insufficient permissions
     *       404:
     *         description: Product not found
     *       422:
     *         $ref: '#/components/responses/FieldException'
     *       500:
     *         $ref: '#/components/responses/InternalException'
     */
    router.delete(
      "/delete/:id",
      validateJwt,
      validateAccess(),
      deleteProductValidationRules(),
      validateFields,
      deleteProduct,
    );

    return router;
  }
}
