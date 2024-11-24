import { Router } from "express";
import { AcreditacionController } from "./acreditacionController";

const router = Router();

router.get("/", AcreditacionController.getAll);

export default router;
