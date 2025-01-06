import express from "express";
const router = express.Router();
import ElasticLogstash from "../elastic/elastic.js";
import Users from "../models/users.js";
import UserServices from "../db/services/user_services.js";
import validateUser from "../validators/validate_user.js";
import validateEvents from "../validators/validate_events.js";
import { Op } from "sequelize";
import Events from "../models/events.js";
import EventServices from "../db/services/event_services.js";
const Elastic = new ElasticLogstash();

const UserService = new UserServices();
const EventService = new EventServices();

router.post("/user/new", validateUser, async (req, res) => {
  const userExists = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!userExists) {
    const newUser = await UserService.create_new_user(req.body);
    return res.status(201).send({
      message: "A user has been created.",
      user: newUser.id,
    });
  } else {
    return res.status(200).send({
      message: "User with this email already exists.",
      user: null,
    });
  }
});
router.post("/publish_event", validateEvents, async (req, res) => {
  const currentEvent = await Events.findOne({
    where: {
      [Op.and]: [
        {
          eventName: req.body.eventName,
          city: req.body.city,
        },
      ],
    },
  });

  if (!currentEvent) {
    const event = await EventService.publish_new_event(req.body);
    return res.status(201).send({
      message: "Event has been published.",
      event: event,
    });
  } else {
    return res.status(200).send({
      message: "Event with these details already exists.",
      event: null,
    });
  }
});

router.get("/get_event/:event_id", async (req, res) => {
  const event = await Events.findByPk(req.params.event_id);
  if (!event) {
    return res.status(404).send({
      message: "An event with these details was not found.",
      event: null,
    });
  } else {
    return res.status(200).send({
      message: "Event details found.",
      event: event,
    });
  }
});
//
//
router.get("/get_events", async (req, res) => {
  return res.status(200).send({
    message: "Active and published events.",
    events: await EventService.get_all_published_active_events(),
  });
});
//
//
// router.post("/search", async (req, res) => {
//     if (!req.body || !req.body.first_name) {
//         return res.status(400).send({
//             result: "No search query [ first_name ] provided.",
//         });
//     }
//
//     const searchResults = await Elastic.search_elastic(req);
//     return res.status(200).send({
//         result: searchResults,
//     });
// });
export default router;
