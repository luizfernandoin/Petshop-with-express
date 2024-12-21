import petshopRouter from "./petshopRouter";
import { Router } from "express";


const router = Router();
router.use("/petshops", petshopRouter);


export default router;