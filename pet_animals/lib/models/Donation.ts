import {Schema, model, models} from "mongoose";
import { User } from "./User";
const DonationSchema = new Schema({
    donor:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    donorName:{
        type:String,
        required:true,
    }
    ,
    donorPhone:{
        type:String,
        required:true,
    }
    ,
    amount:{
        type:Number,
        required:true,

    }
},{timestamps:true});

export const Donation = models.Donation || model("Donation", DonationSchema);