import Users from "../../models/users.js";

class UserServices {
  create_new_user = async (user_object) => {
    return await Users.create({
      email: user_object.email,
      firstName:
        user_object.firstName.charAt(0).toUpperCase() +
        user_object.firstName.slice(1),
      lastName:
        user_object.lastName.charAt(0).toUpperCase() +
        user_object.lastName.slice(1),
    });
  };

  find_user_by_email = async (email) => {
    return await Users.findOne({
      where: {
        email: email,
      },
    });
  };
}

export default UserServices;
