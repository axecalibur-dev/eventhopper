import express from "express";
import validateEvents from "../validators/validate_events.js";
import eventController from "../controllers/event_controller.js";

const router = express.Router();

router.post("/publish", validateEvents, eventController.publishEvent);
router.get("/get_events/:event_id", eventController.getEvent);
router.get("/get_events", eventController.getAllEvents);

export default router;
