import { Router } from "express";
import { FacultadController } from "./facultadController";

const router = Router();

router.get("/", FacultadController.getAll);
router.get("/:id", FacultadController.getById);
router.post("/", FacultadController.create);
router.patch("/:id", FacultadController.update);
router.delete("/:id", FacultadController.delete);

export default router;
