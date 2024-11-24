import { Router } from "express";
import { CarreraController } from "./carreraController";

const router = Router();

router.get("/", CarreraController.getAll);
router.get("/:id", CarreraController.getById);
router.post("/", CarreraController.create);
router.put("/:id", CarreraController.update);
router.delete("/:id", CarreraController.delete);

export default router;
