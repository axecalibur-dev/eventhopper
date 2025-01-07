import BaseController from "./base_controller.js";
import UserServices from "../db/services/user_services.js";

class UserController extends BaseController {
  constructor() {
    super();
    this.userService = new UserServices();
  }

  createUser = async (req, res) => {
    try {
      const userExists = await this.userService.find_user_by_email(
        req.body.email,
      );
      if (userExists) {
        return this.handleSuccess(
          res,
          "User with this email already exists.",
          null,
        );
      }

      const newUser = await this.userService.create_new_user(req.body);
      return this.handleSuccess(res, "A user has been created.", {
        id: newUser.id,
      });
    } catch (error) {
      return this.handleError(res, "Error creating user.");
    }
  };
}

export default new UserController();
