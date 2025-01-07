import ElasticLogstash from "../../elastic/elastic.js";
const Elastic = new ElasticLogstash();

class InsertIntoElastic {
  insert = async (obj) => {
    return await Elastic.insert_into_elastic(obj);
  };
}

export default InsertIntoElastic;
