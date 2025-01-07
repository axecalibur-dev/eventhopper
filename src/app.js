import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connect_to_databases } from "./db/connection.js";
import userRoutes from "./routes/user_routes.js";
import eventRoutes from "./routes/event_routes.js";
import reportRoutes from "./routes/report_routes.js";
import ticketRoutes from "./routes/ticket_routes.js";
import error_handler from "./handler/error_handler.js";
import setUpAssociations from "./models/associations.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/ticket", ticketRoutes);
app.use("/report", reportRoutes);
app.use(error_handler);
const start_server = async () => {
  try {
    await connect_to_databases();
    await setUpAssociations();
    app.listen(port, () =>
      console.log(`EventHopper is running at port: ${port}`),
    );
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

await start_server();
