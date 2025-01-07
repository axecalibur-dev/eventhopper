import mongoose from "mongoose";

const taskLoggerSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  task_name: {
    type: String,
    required: true,
  },

  job_id: {
    type: String,
    required: true,
  },

  queue: {
    type: String,
    required: true,
  },

  arguments: {
    type: Array,
    required: false,
  },

  return_statement: {
    type: String,
    required: false,
  },

  final_status: {
    type: String,
    default: "ONGOING",
    require: true,
  },
});

export const TaskLogger = mongoose.model("TaskLogger", taskLoggerSchema);
