import { build_queue } from "./build_bull_queue.js";
import { create_worker } from "./worker.js";
import Utils from "../utils/utils.js";
import { TaskLogger } from "../db/schemas/taskLogger.js";
const Util = new Utils();

class BullMessageQueueService {
  send_task = async (queue_name, job_name, function_instance, args) => {
    const job_id = Util.generate_system_job_id(queue_name, job_name); // create a sys gen unique ID for the task ( job ID )
    console.log(
      `>> 🔄 🚨 Task Received :: Queue : ${queue_name} || Job : ${job_name} || Args : ${JSON.stringify(
        args,
      )} || JobID : ${job_id}`,
    );

    // logs the task information in mongo collection.
    const registerTask = new TaskLogger({
      task_name: job_name,
      job_id: job_id,
      queue: queue_name,
      arguments: args,
    });
    const registry = await registerTask.save();

    // calls the build function and returns the queue instance to create a new queue for the queue name passed as an argument.
    const myQueue = build_queue(queue_name);

    // pushes the job meta to the queue
    await myQueue.add(job_name, args, {
      jobId: job_id,
      removeOnComplete: true, // remove the job meta from queue upon completion.
    });

    // create a new worker for this job.
    await create_worker(
      queue_name,
      function_instance, // the function instance in which actual operation will happen.
      args,
      job_id,
      job_name,
      registry._id,
    );
  };
}
export default BullMessageQueueService;
