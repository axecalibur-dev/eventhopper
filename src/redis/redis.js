import Redis from "ioredis";

class RedisService {
    constructor() {
        this.redis = new Redis({
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_URL_DEPLOYED,
            username: process.env.REDIS_USER,
            password: process.env.REDIS_PWD,
            database: process.env.REDIS_DB_DEPLOYED,
            maxRetriesPerRequest: null,
        });
    }

    set_in_redis_with_expiry = async (key, value, expiry) => {
        try {
            await this.redis.setex(key, expiry, value);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    get_from_redis_with_expiry = async (key) => {
        try {
            return this.redis.get(key);
        } catch (e) {
            console.error(e);
            return undefined;
        }
    };

    set_in_redis = async (key, value) => {
        try {
            await this.redis.set(key, value);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    delete_key = async (key) => {
        try {
            await this.redis.del(key);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    get_redis_options = () => {
        return this.redis;
    };

    quick_response = async (key) => {
        try {
            return this.redis.get(key);
        } catch (e) {
            console.log("Could not get from redis.", e);
            return false;
        }
    };
}

export default RedisService;
