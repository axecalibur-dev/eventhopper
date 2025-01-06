import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";

export const Events = sequelize.define("Events", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Correct usage of DataTypes.NOW
  },

  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Correct usage of DataTypes.NOW
  },
  eventName: { type: DataTypes.STRING, allowNull: false },
  eventType: { type: DataTypes.STRING, allowNull: false },
  eventStartDate: { type: DataTypes.DATE, allowNull: false },
  eventEndDate: { type: DataTypes.DATE, allowNull: false },
  //streetnane
  streetname: { type: DataTypes.STRING, allowNull: false },
  //locality
  locality: { type: DataTypes.STRING, allowNull: false },
  //city
  city: { type: DataTypes.STRING, allowNull: false },
  //state
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
  is_deleted: { type: DataTypes.BOOLEAN, default: false },
});

export default Events;
