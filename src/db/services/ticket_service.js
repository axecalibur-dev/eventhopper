import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import Tickets from "../../models/tickets.js";
import Users from "../../models/users.js";
import Events from "../../models/events.js";

class TicketService {
  generate_ticket_code = async (eventName) => {
    const uuid = uuidv4();
    const hash = crypto.createHash("sha256");
    hash.update(uuid);
    const hashedValue = hash.digest("hex");
    const eventPrefix = eventName.slice(0, 3).toUpperCase();
    return `TCKT-${eventPrefix}-${hashedValue.slice(0, 8)}`;
  };

  create_new_ticket = async (user_id, event_id, eventName) => {
    return await Tickets.create({
      ticket_code: await this.generate_ticket_code(eventName),
      user: user_id,
      event: event_id,
    });
  };

  get_ticket = async (ticket_id) => {
    return await Tickets.findByPk(ticket_id, {
      include: [
        {
          model: Users,
          foreignKey: "user",
          as: "userData",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Events,
          foreignKey: "event",
          as: "eventData",
          attributes: ["id", "eventName", "eventStartDate", "eventEndDate"],
        },
      ],
    });
  };
}

export default TicketService;
