import BaseController from "./base_controller.js";
import ReportService from "../db/services/report_service.js";

class ReportController extends BaseController {
  constructor() {
    super();
    this.reportService = new ReportService();
  }
  generate_sales_report = async (req, res) => {
    try {
      const event = await this.reportService.generate_sales_report_service(
        req.params.event_id,
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
}
export default new ReportController();
