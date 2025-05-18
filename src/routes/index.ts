import { Router } from "express";

import { ProductRouter } from "./product.routing";
import { AuthRouter } from "src/routes/auth.routing";

export class MainRouter {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRouter.routes);
    router.use("/api/product", ProductRouter.routes);

    return router;
  }
}
