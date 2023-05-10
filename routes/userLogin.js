
 

import express from 'express';
import { generateAuthToken, User } from '../models/user.js';
import bcrypt from 'bcrypt';
let router = express.Router();

router.post("/",async(req,res)=>{
    try {
        const userToLogin = await User.findOne({gmail:req.body.gmail});

    if(!userToLogin){
        return res.status(400).send("User not found");
    }

    const validPassword =await bcrypt.compare(
        req.body.password,userToLogin.password
    )

    if(!validPassword){
        return res.status(400).send("Invalid password");
    }

    const authToken = await generateAuthToken(userToLogin._id);
    res.status(200).send({authToken:authToken,userName:userToLogin.userName,gmail:userToLogin.gmail});
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
    
})
export const logInRoute = router;