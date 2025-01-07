import { Queue } from "bullmq";
import RedisService from "../redis/redis.js";

const Redis = new RedisService();

// this part of the code builds a new queue to populate task meta in returns queue instance to the worker building function.
export const build_queue = (queue_name) => {
  return new Queue(queue_name, {
    connection: Redis.get_redis_options(),
  });
};
