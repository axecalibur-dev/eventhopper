const config = {
    development: {
        username: process.env.POSTGRES_USER || "default_username",
        password: process.env.POSTGRES_PASSWORD || "default_password",
        database: process.env.POSTGRES_DB || "default_database",
        host: process.env.POSTGRES_HOST || "localhost",
        dialect: "postgres",
    },
    production: {
        username: process.env.POSTGRES_USER || "default_username",
        password: process.env.POSTGRES_PASSWORD || "default_password",
        database: process.env.POSTGRES_DB || "default_database",
        host: process.env.POSTGRES_HOST || "localhost",
        dialect: "postgres",
    },
};

export default config;
