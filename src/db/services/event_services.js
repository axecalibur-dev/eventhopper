import Events from "../../models/events.js";
import { parse } from "date-fns";

class EventServices {
  publish_new_event = async (event_object) => {
    return Events.create({
      eventName: event_object.eventName,
      eventType: event_object.eventType,
      eventStartDate: parse(
        event_object.eventStartDate,
        "dd/MM/yyyy",
        new Date(),
      ),
      eventEndDate: parse(event_object.eventEndDate, "dd/MM/yyyy", new Date()),
      streetname: event_object.streetname,
      locality: event_object.locality,
      city: event_object.city,
      state: event_object.state,
      address_full_string: `${event_object.streetname},${event_object.locality},${event_object.locality},${event_object.state}`,
      organizing_entity: event_object.organizing_entity,
      organizing_secondary_contact_email:
        event_object.organizing_secondary_contact_email || null,
      organizing_poc: event_object.organizing_poc,
      eventShortDescription: event_object.eventShortDescription,
      eventLongDescription: event_object.eventLongDescription,
      eventHeroImage: event_object.eventHeroImage || null,
      eventProfileImage: event_object.eventProfileImage || null,
      pricePerUnit: event_object.pricePerUnit,
      ticketsAvailable: event_object.ticketsAvailable,
    });
  };

  get_all_published_active_events = async () => {
    const events = await Events.findAll({
      where: {
        is_deleted: false,
      },
    });
    if (events.length === 0) {
      return [];
    } else return events;
  };
}

export default EventServices;
