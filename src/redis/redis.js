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

  get_redis_options = () => {
    return this.redis;
  };
}

export default RedisService;
