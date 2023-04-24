import express from "express";
import {
  getStudent,
  getStudentDetails,
  updateDetails,
} from "../controllers/students.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getStudent);
router.get("/:id/details", verifyToken, getStudentDetails);

/* UPDATE */
router.patch("/:id/update", verifyToken, updateDetails);

export default router;
