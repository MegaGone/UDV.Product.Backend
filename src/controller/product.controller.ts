import { Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "src/enums";
import { CustomError } from "src/model";
import { ProductService } from "src/service";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, unitPrice, stock, sku, category, attributes } = req.body;

    const productService: ProductService = req.app.locals.productService;

    const nameIsAlreadyInUse = await productService.findOneByName(name);
    if (nameIsAlreadyInUse)
      throw new CustomError(STATUS_CODE.BAD_REQUEST, "Product name already in use");

    const id: number = await productService.store({
      Sku: sku,
      Name: name,
      Stock: stock,
      Category: category,
      UnitPrice: unitPrice,
      Attributes: attributes,
      Description: description,
    });

    return res.status(STATUS_CODE.SUCCESSFULLY).json({ statusCode: STATUS_CODE.SUCCESSFULLY, id });
  } catch (error) {
    next(error);
  }
};

export const findProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const productService: ProductService = req.app.locals.productService;
    const product = await productService.findOneById(id);

    if (!product) throw new CustomError(STATUS_CODE.NOT_FOUND, "Product not found");

    return res
      .status(STATUS_CODE.SUCCESSFULLY)
      .json({ statusCode: STATUS_CODE.SUCCESSFULLY, product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, description, unitPrice, stock, isAvailable, sku, category, attributes } =
      req.body;

    const productService: ProductService = req.app.locals.productService;

    if (name) {
      const nameIsAlreadyInUse = await productService.findOneByName(name);

      if (nameIsAlreadyInUse)
        throw new CustomError(STATUS_CODE.BAD_REQUEST, "Product name already in use");
    }

    const wasUpdated = await productService.update(id, {
      Sku: sku,
      Name: name,
      Stock: stock,
      Category: category,
      UnitPrice: unitPrice,
      Attributes: attributes,
      IsAvailable: isAvailable,
      Description: description,
    });

    return res
      .status(STATUS_CODE.SUCCESSFULLY)
      .json({ statusCode: STATUS_CODE.SUCCESSFULLY, wasUpdated });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const productService: ProductService = req.app.locals.productService;
    const wasDeleted = await productService.delete(id);

    return res
      .status(STATUS_CODE.SUCCESSFULLY)
      .json({ statusCode: STATUS_CODE.SUCCESSFULLY, wasDeleted });
  } catch (error) {
    next(error);
  }
};

export const findProductsPaginated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pageSize = 10, page = 1 } = req.query;

    const productService: ProductService = req.app.locals.productService;
    const { data, count, currentPage, pageCount } = await productService.findPaginated(
      +page,
      +pageSize,
    );

    return res.status(STATUS_CODE.SUCCESSFULLY).json({
      count: count,
      products: data,
      pages: pageCount,
      page: currentPage,
      statusCode: STATUS_CODE.SUCCESSFULLY,
    });
  } catch (error) {
    next(error);
  }
};
