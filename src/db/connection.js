import mongoose from "mongoose";
import { Sequelize } from "sequelize";

// Define the connection strings
export const mongo_connect_string = () => {
    return `${process.env.MONGO_CONNECTION_PREFIX}://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_DB_IP}/${process.env.MONGO_CONNECT_SUFFIX}`;
};
export const postgres_connect_string = () => {
    return `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
};
// Define the Sequelize instance
const sequelize = new Sequelize(postgres_connect_string(), {
    logging: false,
    dialectOptions: {
        multipleStatements: true,
    },
});

// Function to connect to databases
export const connect_to_databases = async () => {
    try {
        await mongoose.connect(mongo_connect_string(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongodb connection established. 💽 ✅ ");
    } catch (error) {
        console.error("Mongodb Connection Failed ❌", error);
        process.exit(1); // Exit the application on DB connection failure
    }

    try {
        await sequelize.authenticate();
        console.log("Postgres Connection established. 💽 ✅ ");
    } catch (error) {
        console.error("Postgres Connection Failed ❌", error);
        process.exit(1); // Exit the application on DB connection failure
    }
    // keep it commented
    // await sequelize.sync({});
};

// Export the Sequelize instance
export { sequelize };
