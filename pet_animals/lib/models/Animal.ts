import  {Schema, model, models} from "mongoose";

const AnimalSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    age:{
        type: Number,

    },
    breed:{
        type:String,
    },
    gender:{
        type: String,
        enum: ["male", "female"],
    },
    healthStatus:{
        type:String,
    },
    vaccinationStatus:{
        type: String,
    },
    rescueStory:{
        type: String,
    },
    images:[{
        type:String,
    }],
    location:{
        type:String,
        required: true,
    }
    ,


},{timestamps: true});

export const Animal = models.Animal || model("Animal", AnimalSchema);