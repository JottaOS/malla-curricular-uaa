import { Router } from "express";
import { MateriaController } from "./materiaController";

const router = Router();

router.get("/", MateriaController.getAll);
router.get("/:id", MateriaController.getById);
router.post("/", MateriaController.create);
router.put("/:id", MateriaController.update);
router.delete("/:id", MateriaController.delete);

export default router;
