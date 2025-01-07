class Utils {
  generate_system_job_id = (queue_name, job_name) => {
    const timestamp = new Date().toISOString();
    return `${queue_name}_${job_name}_${timestamp}`;
  };
}
export default Utils;
