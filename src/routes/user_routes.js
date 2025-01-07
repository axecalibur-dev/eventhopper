import express from "express";
import validateUser from "../validators/validate_user.js";
import userController from "../controllers/user_controller.js";

const router = express.Router();

router.post("/new", validateUser, userController.createUser);

export default router;
