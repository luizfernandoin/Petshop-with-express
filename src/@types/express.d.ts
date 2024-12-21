import { Petshop } from "@prisma/client";

declare global {
  declare namespace Express {
    export interface Request {
      petshop?: Petshop;
    }
  }
}
