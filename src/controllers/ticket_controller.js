import BaseController from "./base_controller.js";
import TicketService from "../db/services/ticket_service.js";
import Tickets from "../models/tickets.js";

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
      if (event.data === null) {
        return this.handleError(res, event.message, event.status);
      }
      return this.handleSuccess(res, event.message, event.data, event.status);
    } catch (error) {
      console.log(error);
      return this.handleError(res, "Error generating a ticket.");
    }
  };

  get_ticket_details = async (req, res) => {
    try {
      const ticket = await this.ticketService.get_ticket(
        req.params["ticket_id"],
      );
      if (!ticket) {
        return this.handleError(res, "Ticket details not found.", 404);
      }
      return this.handleSuccess(res, "Ticket found ok.", ticket, 200);
    } catch (error) {
      console.log(error);
      return this.handleError(res, "Error retrieving ticket.");
    }
  };
}

export default new TicketController();
