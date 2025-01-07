import express from "express";
import validateUser from "../validators/validate_user.js";
import ticketController from "../controllers/ticket_controller.js";
import validateTicket from "../validators/validate_tickets.js";

const router = express.Router();

router.post(
  "/purchase",
  validateTicket,
  await ticketController.generate_new_ticket,
);

router.get(
  "/ticket_details/:ticket_id",
  await ticketController.get_ticket_details,
);

export default router;
