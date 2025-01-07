import express from "express";
import validateEvents from "../validators/validate_events.js";
import eventController from "../controllers/event_controller.js";

const router = express.Router();

router.post("/publish", validateEvents, await eventController.publishEvent);
router.get("/get_events/:event_id", await eventController.getEvent);
router.get("/get_events", await eventController.getAllEvents);
router.get("/search", await eventController.searchEvents);

export default router;
