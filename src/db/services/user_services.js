import Users from "../../models/users.js";

class UserServices {
    create_new_user = async (user_object) =>{
        return await Users.create({
            email: user_object.email,
            firstName: user_object.firstName,
            lastName: user_object.lastName,
        })
    }
}


export default UserServices