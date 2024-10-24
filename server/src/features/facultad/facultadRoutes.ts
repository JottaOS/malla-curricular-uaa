import { Router } from "express";
import { FacultadController } from "./facultadController";
import { FacultadService } from "./facultadService";
import { FacultadRepository } from "./facultadRepository";

const repository = new FacultadRepository();
const service = new FacultadService(repository);
const controller = new FacultadController(service);

const router = Router();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.patch("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
