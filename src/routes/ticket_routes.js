import express from "express";
import validateUser from "../validators/validate_user.js";
import ticketController from "../controllers/ticket_controller.js";

const router = express.Router();

router.post("/purchase", await ticketController.generate_new_ticket);

export default router;
