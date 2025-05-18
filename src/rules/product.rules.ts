import { PARAM_LOCATION } from "src/enums";
import {
  genericParamRule,
  genericStringRule,
  genericBooleanRule,
  genericIntegerRule,
  genericPaginationRule,
} from "./generic";

export const createProductValidationRules = (additionalRules: any = null) => {
  const newRules = additionalRules || [];

  return [
    genericStringRule(
      ["name", "description", "category"],
      {
        requiredType: "string",
        warnings: "This field doesn't exist, is not a string or is empty.",
      },
      null,
    ),
    genericIntegerRule(
      ["unitPrice", "stock"],
      {
        requiredType: "number",
        warnings: "This field doesn't exist, is not a number or is empty.",
      },
      { min: 1 },
    ),
    genericStringRule(
      ["sku", "attributes"],
      {
        requiredType: "string",
        warnings: "This field doesn't exist, is not a string or is empty.",
      },
      null,
      false,
    ),
    ...newRules,
  ];
};

export const findProductValidationRules = (additionalRules: any = null) => {
  const newRules = additionalRules || [];

  return [
    genericParamRule(
      "id",
      {
        location: PARAM_LOCATION.PARAM,
        warnings: "This field doesn't exist, is not a string or is empty.",
      },
      true,
    ),
    ...newRules,
  ];
};

export const updateProductValidationRules = (additionalRules: any = null) => {
  const newRules = additionalRules || [];

  return [
    genericStringRule(
      ["id"],
      {
        requiredType: "string",
        warnings: "This field doesn't exist, is not a string or is empty.",
      },
      null,
    ),
    genericStringRule(
      ["name", "description", "category", "sku", "attributes"],
      {
        requiredType: "string",
        warnings: "This field doesn't exist, is not a string",
      },
      null,
      false,
    ),
    genericIntegerRule(
      ["unitPrice", "stock"],
      {
        requiredType: "number",
        warnings: "This field doesn't exist, is not a number",
      },
      { min: 1 },
      false,
    ),
    genericBooleanRule(
      "isAvailable",
      {
        requiredType: "boolean",
        warnings: "This field doesn't exist, is not a boolean",
      },
      false,
    ),
    ...newRules,
  ];
};

export const findProductsPaginatedValidationRules = (additionalRules: any = null) => {
  const newRules = additionalRules || [];

  return [
    genericPaginationRule(
      ["page", "pageSize"],
      {
        location: PARAM_LOCATION.QUERY_PARAM,
        warnings: "This field doesn't exist, is not a string or is empty.",
      },
      true,
    ),
    ...newRules,
  ];
};

export const deleteProductValidationRules = (additionalRules: any = null) => {
  const newRules = additionalRules || [];

  return [
    genericParamRule(
      "id",
      {
        location: PARAM_LOCATION.PARAM,
        warnings: "This field doesn't exist, is not a string or is empty.",
      },
      true,
    ),
    ...newRules,
  ];
};
