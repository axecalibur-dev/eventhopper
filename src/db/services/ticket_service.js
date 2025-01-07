import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import Tickets from "../../models/tickets.js";

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
}

export default TicketService;
