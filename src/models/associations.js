import Tickets from "./tickets.js";
import Events from "./events.js";
import Users from "./users.js";

const setUpAssociations = async () => {
  Users.hasMany(Tickets, {
    foreignKey: "user",
    as: "userTickets",
  });
  Tickets.belongsTo(Users, {
    foreignKey: "user",
    as: "userData",
  });

  Events.hasMany(Tickets, {
    foreignKey: "event",
    as: "eventTickets",
  });
  Tickets.belongsTo(Events, {
    foreignKey: "event",
    as: "eventData",
  });
};

export default setUpAssociations;
