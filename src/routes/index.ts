import { Router } from "express";

import { AuthRouter } from "src/routes/auth.routing";

export class MainRouter {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRouter.routes);

    return router;
  }
}
