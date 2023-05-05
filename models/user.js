import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

let userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    gmail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    currentOTP:{
        type:String,
    },
    purchaseHistory:[
        {
            product_name:{
                type:String,
            },
            date:{
                type:String
            }
        }
    ]
})

const generateAuthToken = (id)=>{
    return jwt.sign({id},process.env.SECRET_KEY)
}


export const User = mongoose.model("user",userSchema);
export {generateAuthToken}