import AuthUserModel from "../../models/authUser.models.js"

export const listOfUsers = async() => {
    return await AuthUserModel.find({});
}

