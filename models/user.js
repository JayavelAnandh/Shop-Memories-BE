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
                default:"",
            },
            date:{
                type:String,
                default:"",
            }
        },
    ],
    address:{
        fullName:{
            type:String,
        },
        contact:{
            type:String,
        },
        address1:{
            type:String,
        },
        address2:{
            type:String,
        },
        city:{
            type:String,
        },
        state:{
            type:String,
        },
        country:{
            type:String,
        }
    }
})

const generateAuthToken = (id)=>{
    return jwt.sign({id},process.env.SECRET_KEY)
}


export const User = mongoose.model("user",userSchema);
export {generateAuthToken}