import EventServices from "../db/services/event_services.js";
import BaseController from "./base_controller.js";
import Events from "../models/events.js";
import { Op } from "sequelize";

class EventController extends BaseController {
  constructor() {
    super();
    this.eventService = new EventServices();
  }

  publishEvent = async (req, res) => {
    try {
      const currentEvent = await Events.findOne({
        where: {
          [Op.and]: [{ eventName: req.body.eventName, city: req.body.city }],
        },
      });

      if (!currentEvent) {
        const event = await this.eventService.publish_new_event(req.body);
        return this.handleSuccess(res, "Event has been published.", event, 201);
      } else {
        return this.handleSuccess(
          res,
          "Event with these details already exists.",
          null,
          200,
        );
      }
    } catch (error) {
      return this.handleError(res, "Error publishing event.");
    }
  };

  getEvent = async (req, res) => {
    try {
      const event = await Events.findByPk(req.params.event_id);
      if (!event) {
        return this.handleError(
          res,
          "An event with these details was not found.",
          404,
        );
      }
      return this.handleSuccess(res, "Event details found.", event, 200);
    } catch (error) {
      console.log(error);
      return this.handleError(res, "Error retrieving event.");
    }
  };

  getAllEvents = async (req, res) => {
    try {
      const events = await this.eventService.get_all_published_active_events();
      return this.handleSuccess(
        res,
        "Active and published events.",
        events,
        200,
      );
    } catch (error) {
      console.log(error);
      return this.handleError(res, "Error retrieving events.");
    }
  };
}

export default new EventController();
