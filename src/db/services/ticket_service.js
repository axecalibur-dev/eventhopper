import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import Tickets from "../../models/tickets.js";
import Users from "../../models/users.js";
import Events from "../../models/events.js";
import { sequelize } from "../connection.js";
import { Sequelize, DataTypes, Transaction } from "sequelize";

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
    const transaction = await sequelize.transaction();
    try {
      const event = await Events.findOne({
        where: { id: event_id },
        lock: Transaction.LOCK.UPDATE,
        transaction,
      });

      if (!event) {
        await transaction.rollback();
        return {
          message: "No ticket was found for this event id.",
          status: 404,
          data: null,
        };
      }

      if (event.ticketsAvailable <= 0) {
        await transaction.rollback();
        return {
          message: "Tickets were sold out.",
          status: 200,
          data: null,
        };
      }

      event.ticketsAvailable -= 1;
      await event.save({ transaction });

      const newTicket = await Tickets.create(
        {
          event: event.id,
          user: user_id,
          ticket_code: await this.generate_ticket_code(eventName),
        },
        { transaction },
      );

      await transaction.commit();
      return {
        message: "Tickets were bought.",
        status: 201,
        data: newTicket,
      };
    } catch (error) {
      await transaction.rollback();
      return [error.message, 201];
    }
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
