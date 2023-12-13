import mongoose from "mongoose";

const Donor = new mongoose.Schema(
    {
            email:{type: String, require: true, unique: true},
            name: {type: String, require: true},
            Add: {type: String, require: true},
            dob: {type: String, require: true},
            bloodGroup: {
                type:String,
                enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
            },
            donated: Number,
            donatedAt:[],
    },


    {timestamps: true},
)

export default mongoose.model("Donor", Donor);