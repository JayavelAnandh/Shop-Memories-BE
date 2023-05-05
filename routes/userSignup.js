import express from 'express';
import { generateAuthToken, User } from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/",async(req,res)=>{
    try {
        let newUser = await User.findOne({gmail:req.body.gmail});

        if(newUser){
           return res.status(400).send({message:"User already exists"})
        }
        let salt = await bcrypt.genSalt(10);
        let userPassword = req.body.password.toString();
        let hashedPassword = await bcrypt.hash(userPassword,salt)

        newUser = await new User({
            userName:req.body.userName,
            gmail:req.body.gmail,
            password:hashedPassword
        }).save();

        let AuthToken = generateAuthToken(newUser._id);
        res.status(200).send({authToken:AuthToken,userName:newUser.userName});
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }

})

export const signUpRoute = router;