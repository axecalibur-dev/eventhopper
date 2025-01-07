import BaseController from "./base_controller.js";
import TicketService from "../db/services/ticket_service.js";
import Events from "../models/events.js";

class TicketController extends BaseController {
  constructor() {
    super();
    this.ticketService = new TicketService();
  }

  generate_new_ticket = async (req, res) => {
    try {
      const event = await this.ticketService.create_new_ticket(
        req.body.user_id,
        req.body.event_id,
        req.body.eventName,
      );
      if (!event) {
        return this.handleError(res, "Ticket purchase failed.", 404);
      }
      return this.handleSuccess(res, "Ticket purchase ok.", event, 200);
    } catch (error) {
      console.log(error);
      return this.handleError(res, "Error retrieving ticket.");
    }
  };
}

export default new TicketController();
