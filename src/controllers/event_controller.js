import EventServices from "../db/services/event_services.js";
import BaseController from "./base_controller.js";
import Events from "../models/events.js";
import { Op } from "sequelize";
import BullMessageQueueService from "../bull/bull_service.js";
import { RegisteredQueues } from "../bull/queues.js";
import InsertIntoElastic from "../bull/tasks/insert_into_elastic.js";
import ElasticLogstash from "../elastic/elastic.js";
const BullTasks = new BullMessageQueueService();
const ElasticService = new InsertIntoElastic();
const Elastic = new ElasticLogstash();

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
        await BullTasks.send_task(
          RegisteredQueues.Service_Queue,
          "Insert_Into_Elastic",
          ElasticService.insert,
          [
            {
              event_id: event.id,
              eventName: req.body.eventName,
              eventStartDate: req.body.eventStartDate,
              eventEndDate: req.body.eventEndDate,
              city: req.body.city,
              state: req.body.state,
              ticketsAvailable: req.body.ticketsAvailable,
            },
          ],
        );
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

  searchEvents = async (req, res) => {
    if (!req.body || !req.body.eventName) {
      return res.status(400).send({
        result: "No search query [ eventName ] provided.",
      });
    }

    const searchResults = await Elastic.search_elastic(req);
    return res.status(200).send({
      result: searchResults,
    });
  };
}

export default new EventController();
