import express from "express";
import validateUser from "../validators/validate_user.js";
import reportController from "../controllers/report_controller.js";

const router = express.Router();

router.get("/generate/:event_id", await reportController.generate_sales_report);

export default router;
