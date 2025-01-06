import express from "express";
const router = express.Router();
import ElasticLogstash from "../elastic/elastic.js";
import Users from "../models/users.js";
import UserServices from "../db/services/user_services.js";
import validateUser from "../validators/request_validators.js";
const Elastic = new ElasticLogstash();

const UserService = new UserServices();

router.post("/user/new",validateUser, async (req, res) => {
    const userExists = await Users.findOne({
        where : {
            email: req.body.email,
        }
    })
    if (!userExists) {
        const newUser = await UserService.create_new_user(req.body)
        return res.status(201).send({
            "message": "User has been created.",
            "user" : newUser.id
        })
    }

    else {
        return res.status(200).send({
            "message": "User with this email already exists.",
            "user" : null
        })
    }
});
// router.post("/publish_event", async (req, res) => {
// });
//
// router.get("/get_event", async (req, res) => {
// });
//
//
// router.get("/get_events", async (req, res) => {
// });
//
//
// router.post("/search", async (req, res) => {
//     if (!req.body || !req.body.first_name) {
//         return res.status(400).send({
//             result: "No search query [ first_name ] provided.",
//         });
//     }
//
//     const searchResults = await Elastic.search_elastic(req);
//     return res.status(200).send({
//         result: searchResults,
//     });
// });
export default router;
