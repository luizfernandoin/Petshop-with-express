import petshopRouter from "./petshopRouter";
import petRouter from "./petRouter";
import { Router } from "express";


const router = Router();
router.use("/petshops", petshopRouter);
router.use("/pets", petRouter);

export default router;