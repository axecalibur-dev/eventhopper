import Events from "../../models/events.js";

class ReportService {
  generate_sales_report_service = async (event_id) => {
    const event = await Events.findByPk(event_id);
    if (!event) {
      return {
        message: "No event was found for this event id",
        status: 404,
        data: null,
      };
    }

    const revenueGenerated = event.pricePerUnit * event.ticketsSold;
    const ticketsSold = event.ticketsSold;
    return {
      message: "Report generated.",
      status: 200,
      data: {
        ticketsAvailable: event.ticketsAvailable,
        revenueGenerated: revenueGenerated,
        ticketsSold: ticketsSold,
      },
    };
  };
}

export default ReportService;
