import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import { listOfUsers } from "../lib/utils/listOfUsers.js";
import AuthUserModel from "../models/authUser.models.js";
import bcrypt from 'bcryptjs';

export const authUserSignup = async (request, response) => {
    try {
        

        const {username, fullname, password, email} = request.body;
        if(!username || !fullname || !password || !email){
            return response.status(400).json({error: "Fill all the required fields"})
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            return response.status(400).json({error: "Invalid email format"})
        } 
        
        const usernameExists = await AuthUserModel.findOne({username});
        if(usernameExists){
            return response.status(400).json({message: "username already taken"})
        }


        const emailExists = await AuthUserModel.findOne({email});

        if(emailExists){
            return response.status(400).json({error: "Email is associated with a different account"})
        }

        if(password.length < 6){
            return response.status(400).json({error: "Password must be atleast 6 charecters"})
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new AuthUserModel({
            username, 
            fullname,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, response);

            await newUser.save();
            return response.status(200).json({
                username: newUser.username,
                fullname: newUser.fullname,
                email: newUser.email,
                password: newUser.password
            })
        }else{
            return response.status(400).json({error: "Invalid user signup details"})
        }
        
    } catch (error) {
        console.log(error);
        return response.status(500).json({error: "Internal server error"})        
    }
}
//login through your email or username
export const authUserLogin = async(request, response) => {
    try {
        const {username, password} = request.body;
        const allUsers = await listOfUsers();
        const userExists = allUsers.find(x => x?.username === username || x?.email === username);
        const isPasswordCorrect = await bcrypt.compare(password, userExists?.password || "")
        

        if(!userExists){
            return response.status(400).json({error: "Invalid email or username"})
        }else if(!isPasswordCorrect){
            return response.status(400).json({error: "Invalid password"})
        }

        generateTokenAndSetCookie(userExists._id, response);

        return response.status(200).json({
            _id: userExists._id,
            username: userExists.username,
            email: userExists.email,
            fullname: userExists.fullname,
        })

    } catch (error) {
        console.log("Error in authUserLogin constroller", error.message);
        return response.status(500).json({error: "Internal server error"})
    }
} 

export const authUserLogout = (request, response) => {
    try {
        response.cookie("jwt", "", {maxAge: 0});
        response.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in authUserLogout constroller", error.message);
        return response.status(500).json({error: "Internal server error"})
    }
} 

export const getMe = async(request, response) => {
    try {
        const user = await AuthUserModel.findById(request.user._id).select("-password");
        return response.status(200).json(user);
    } catch (error) {
        console.log("Error in the getMe controller", error.message);
        return response.status(500).json({error: "Internal server error"})
    }
} 