import express from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./middlewares/cors";
import { notFoundHandler } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import facultadRouter from "./features/facultad/facultadRoutes";
import materiaRouter from "./features/materia/materiaRoutes";
import carreraRouter from "./features/carrera/carreraRoutes";
import acreditacionRouter from "./features/acreditacion/acreditacionRoutes";
import { loggerMiddleware } from "./middlewares/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(corsMiddleware());
app.use(loggerMiddleware);

app.use("/api/facultades", facultadRouter);
app.use("/api/materias", materiaRouter);
app.use("/api/carreras", carreraRouter);
app.use("/api/acreditaciones", acreditacionRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
