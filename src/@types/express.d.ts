import { Petshop } from "./petshop";

declare global {
  declare namespace Express {
    export interface Request {
      petshop?: Petshop;
    }
  }
}
