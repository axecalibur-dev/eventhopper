import express from "express";
const router = express.Router();
import ElasticLogstash from "../elastic/elastic.js";
const Elastic = new ElasticLogstash();


router.post("/publish_event", async (req, res) => {
});

router.get("/get_event", async (req, res) => {
});


router.get("/get_events", async (req, res) => {
});


router.post("/search", async (req, res) => {
    if (!req.body || !req.body.first_name) {
        return res.status(400).send({
            result: "No search query [ first_name ] provided.",
        });
    }

    const searchResults = await Elastic.search_elastic(req);
    return res.status(200).send({
        result: searchResults,
    });
});
export default router;
