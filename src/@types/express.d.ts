import { Petshop } from "@prisma/client";
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    petshop?: Petshop;
  }
}
