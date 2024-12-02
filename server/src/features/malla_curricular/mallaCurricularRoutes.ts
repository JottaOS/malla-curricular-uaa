import { Router } from "express";
import { MallaCurricularController } from "./mallaCurricularController";
import { MallaCurricularDetalleController } from "../malla_curricular_detalle/mallaCurricularDetalleController";

const router = Router();

router.get("/", MallaCurricularController.getAll);
router.get("/:id", MallaCurricularController.getById);
router.post("/", MallaCurricularController.create);
router.put("/:id", MallaCurricularController.update);
router.delete("/:id", MallaCurricularController.delete);

/**
 * Detalle de mallas curriculares
 */

router.get("/detalles", MallaCurricularDetalleController.getAll);
router.get("/detalles/:id", MallaCurricularDetalleController.getById);

export default router;
