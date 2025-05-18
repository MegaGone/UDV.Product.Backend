import { version } from "package.json";
import {
  FieldException,
  RefreshCookieSchema,
  UnauthorizedException,
  AuthorizationBearerSchema,
  InternalException,
} from "src/documentation";

export const SwaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "UDV.Product.Backend",
      version: version,
      description: "API para creación de productos",
    },
    servers: [],
    components: {
      securitySchemes: {
        RefreshCookieSchema,
        AuthorizationBearerSchema,
      },
      schemas: {},
      responses: {
        FieldException,
        InternalException,
        UnauthorizedException,
      },
    },
  },
  apis: ["**/routes/*.ts"],
};
