import { Router, Request, Response } from "express";
import { query } from "./db";

const router = Router();

// GET all faculties
router.get("/facultades", async (req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM facultad");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET a specific faculty by ID
router.get("/facultades/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await query("SELECT * FROM facultad WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
