import petshopRouter from "./petshopRouter";
import petRouter from "./petsRoutes";
import { Router } from "express";


const router = Router();
router.use("/petshops", petshopRouter);
router.use("/pets", petRouter);

export default router;