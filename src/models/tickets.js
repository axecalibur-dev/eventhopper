import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";

export const Tickets = sequelize.define(
  "Tickets",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    ticket_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },

    event: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Events",
        key: "id",
      },
    },

    is_consumed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    hooks: {
      afterCreate: (ticket, options) => {
        const ticketObject = ticket.get();
        delete ticketObject.is_deleted;
        delete ticketObject.is_consumed;
        return ticketObject;
      },
    },
    defaultScope: {
      attributes: { exclude: ["is_deleted", "is_consumed"] },
    },
  },
);

export default Tickets;
