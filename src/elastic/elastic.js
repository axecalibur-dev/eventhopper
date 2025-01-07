import { Client } from "@elastic/elasticsearch";
import Users from "../models/users.js";
import FunctionConstants from "../globals/constants/function_constans.js";
import Events from "../models/events.js";

const ES = new Client({
  node: `http://${process.env.ES_HOST}:${process.env.ES_PORT}`,
});

class ElasticLogstash {
  insert_into_elastic = async (obj) => {
    const eventSingleObject = obj[0];
    try {
      const eventObject = await Events.findOne({
        where: {
          id: eventSingleObject.event_id,
        },
      });

      if (!eventObject) {
        return [
          FunctionConstants.FAILED,
          "No Event was found in database to punch against.",
        ];
      }
      const result = await ES.index({
        index: "events",
        document: {
          eventName: eventSingleObject.eventName,
          eventStartDate: eventSingleObject.eventStartDate,
          eventEndDate: eventSingleObject.eventEndDate,
          city: eventSingleObject.city,
          state: eventSingleObject.state,
          ticketsAvailable: eventSingleObject.ticketsAvailable,
        },
      });

      return [FunctionConstants.SUCCESS, "Inserted Into Elastic."];
    } catch (error) {
      console.error("Error sending data to Elastic:", error);
      return [FunctionConstants.FAILED, error];
    }
  };

  search_elastic = async (obj) => {
    try {
      const body = await ES.search({
        index: "events",
        query: {
          match: {
            eventName: obj.body.eventName,
          },
        },
      });

      return body.hits.hits.map((hit) => ({
        eventName: hit._source.eventName || "N/A",
        eventStartDate: hit._source.eventStartDate || "N/A",
        eventEndDate: hit._source.eventEndDate || "N/A",
        city: hit._source.city || "N/A",
        state: hit._source.state || "N/A",
        ticketsAvailable: hit._source.ticketsAvailable || "N/A",
      }));
    } catch (error) {
      console.error("Error querying Elasticsearch:", error);
      return [];
    }
  };
}

export default ElasticLogstash;
