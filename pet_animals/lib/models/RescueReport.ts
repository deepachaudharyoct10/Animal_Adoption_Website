import {Schema, model, models} from 'mongoose';
import {User} from './User';
import {Animal} from './Animal';
const RescueReportSchema = new Schema({
    reporter:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    reporterName:{
        type:String,
        required:true,
    },
    reporterPhone:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    animalType:{
        type:String,
        required:true,
    },
    rescueStatus:{
        type:String,
        enum:["pending","rescued","not rescued"],
        default:"pending",
    }
    
},{timestamps:true})

export const RescueReport = models.RescueReport || model("RescueReport", RescueReportSchema); 