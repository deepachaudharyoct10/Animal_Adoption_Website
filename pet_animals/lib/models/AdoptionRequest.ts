import {Schema, model, models} from "mongoose";
import { User } from "./User";
import {Animal} from "./Animal";
const AdoptionRequestSchema = new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    animal:{
        type:Schema.Types.ObjectId,
        ref:"Animal",
        required:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    occupation:{
        type:String,
        required:true,
    },
    previousExperience:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"]
    }



},{timestamps:true});

export const AdoptionRequest = models.AdoptionRequest || model("AdoptionRequest", AdoptionRequestSchema);