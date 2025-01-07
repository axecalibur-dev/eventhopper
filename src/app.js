import express from "express";
import dotenv from "dotenv";
import { connect_to_databases } from "./db/connection.js";
dotenv.config();
import userRoutes from "./routes/user_routes.js";
import eventRoutes from "./routes/event_routes.js";
import error_handler from "./handler/error_handler.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use(error_handler);
const start_server = async () => {
  try {
    await connect_to_databases();
    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`),
    );
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

await start_server();
