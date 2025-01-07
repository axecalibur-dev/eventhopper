import { Worker } from "bullmq";
import RedisService from "../redis/redis.js";
import { TaskLogger } from "../db/schemas/taskLogger.js";

const Redis = new RedisService();

export const create_worker = async (
  queue_name,
  function_instance,
  args,
  job_id,
  job_name,
  registry_id,
) => {
  // create a new worker with the provided information.
  // console.log(`>> 🔄 👷 Spawning new workers for ${job_id}`);
  const worker = new Worker(
    queue_name,
    async (job) => {
      return await function_instance(job.data);
    },
    {
      limiter: {
        max: 1,
        duration: 10000,
      },
      concurrency: 10,
      connection: Redis.get_redis_options(),
    },
  );
  // console.log(`>> 👷👷👷 Workers Deployed for ${job_id}`);
  //#######################################################/////////////////////////////////////////////////////////////
  worker.on("error", async (err) => {
    console.log(
      `🔄 ⚠️  Job with SysID ${job_id} has encountered an error. Error : ${err.message}`,
    );
    await TaskLogger.findByIdAndUpdate(registry_id, {
      $set: {
        updated_at: Date.now(),
        return_statement: err,
      },
    });
  });

  worker.on("completed", async (job, result) => {
    console.log(
      `>> 🔄 ✅  Job with SysID ${job.id} has completed. The handler returned the following response : ${result}`,
    );
    const updated = await TaskLogger.findByIdAndUpdate(registry_id, {
      $set: {
        updated_at: Date.now(),
        return_statement: result[1],
        final_status: result[0],
      },
    });
    await worker.close();
  });

  worker.on("failed", async (job, err) => {
    console.log(
      `>> 🔄 ⭕  Job with SysID ${job.id} has failed with message : ${err.message}`,
    );
    await TaskLogger.findByIdAndUpdate(registry_id, {
      $set: {
        updated_at: Date.now(),
        return_statement: err[0],
        final_status: err[1],
      },
    });
  });

  return worker;
};
