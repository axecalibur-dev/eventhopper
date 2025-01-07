import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";

export const Events = sequelize.define(
  "Events",
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
    eventName: { type: DataTypes.STRING, allowNull: false },
    eventType: { type: DataTypes.STRING, allowNull: false },
    eventStartDate: { type: DataTypes.DATE, allowNull: false },
    eventEndDate: { type: DataTypes.DATE, allowNull: false },
    streetname: { type: DataTypes.STRING, allowNull: false },
    locality: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    address_full_string: { type: DataTypes.STRING, allowNull: false },
    organizing_entity: { type: DataTypes.STRING, allowNull: false },
    organizing_secondary_contact_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    organizing_poc: { type: DataTypes.STRING, allowNull: true },
    eventShortDescription: { type: DataTypes.STRING, allowNull: false },
    eventLongDescription: { type: DataTypes.STRING, allowNull: true },
    eventHeroImage: { type: DataTypes.STRING, allowNull: true },
    eventProfileImage: { type: DataTypes.STRING, allowNull: true },
    pricePerUnit: { type: DataTypes.FLOAT, allowNull: false },
    ticketsAvailable: { type: DataTypes.NUMBER, allowNull: false },
    ticketsSold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    hooks: {
      afterCreate: (event, options) => {
        const eventObject = event.get();
        delete eventObject.is_deleted;
        return eventObject;
      },
    },
    defaultScope: {
      attributes: { exclude: ["is_deleted"] },
    },
  },
);

export default Events;
