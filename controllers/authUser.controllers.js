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
            return response.status(400).json({error: "username already taken"})
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

  