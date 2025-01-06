import { Client } from "@elastic/elasticsearch";
import Users from "../models/users.js";
import FunctionConstants from "../globals/constants/function_constans.js";

const ES = new Client({
    node: `http://${process.env.ES_HOST}:${process.env.ES_PORT}`,
});

class ElasticLogstash {
    insert_into_elastic = async (obj) => {
        const userSingleObject = obj[0];
        try {
            const findUser = await Users.findOne({
                where: {
                    id: userSingleObject.user_id,
                },
            });

            if (!findUser) {
                return [
                    FunctionConstants.FAILED,
                    "No User was found in database to punch against.",
                ];
            }
            const result = await ES.index({
                index: "users",
                document: {
                    user_name: userSingleObject.user_name,
                    first_name: userSingleObject.first_name,
                    last_name: userSingleObject.last_name,
                    profile_picture: userSingleObject.profile_picture,
                    user_id: userSingleObject.user_id,
                    university: userSingleObject.university,
                    discipline: userSingleObject.discipline,
                },
            });

            await findUser.update({
                elastic_id: result._id,
            });

            // this service has an additional responsibility
            // of punching the elastic Id of the inserted object in the respective table

            return [FunctionConstants.SUCCESS, "Inserted Into Elastic."];
        } catch (error) {
            console.error("Error sending data to Elastic:", error);
            return [FunctionConstants.FAILED, error];
        }
    };

    search_elastic = async (obj) => {
        try {
            const body = await ES.search({
                index: "users",
                query: {
                    match: {
                        first_name: obj.body.first_name,
                    },
                },
            });

            return body.hits.hits.map((hit) => ({
                profile_url: `www.endsem.com/profile/${hit._source.user_id}`,
                user_name: hit._source.user_name || "N/A",
                first_name: hit._source.first_name || "N/A",
                last_name: hit._source.last_name || "N/A",
                user_id: hit._source.user_id || "N/A",
                profile_picture: hit._source.profile_picture || "N/A",
                university: hit._source.university || "N/A",
                discipline: hit._source.discipline || "N/A",

            }));
        } catch (error) {
            console.error("Error querying Elasticsearch:", error);
            return [];
        }
    };
}

export default ElasticLogstash;
