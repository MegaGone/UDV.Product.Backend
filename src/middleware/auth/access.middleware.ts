import { Request, Response, NextFunction } from "express";
import { ROLE_ENUM_TYPE, STATUS_CODE } from "src/enums";
import { CustomError } from "src/model";

export const validateAccess = (roles: Array<number> = [ROLE_ENUM_TYPE.ADMIN_ROLE]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role } = req;

      console.log("------------->", role);
      if (!role) throw new CustomError(STATUS_CODE.BAD_REQUEST, "Role not valid");

      if (!roles.includes(role)) throw new CustomError(STATUS_CODE.FORBIDDEN, "Forbidden");

      next();
    } catch (error) {
      next(error);
    }
  };
};
