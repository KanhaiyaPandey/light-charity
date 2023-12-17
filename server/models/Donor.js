import mongoose from "mongoose";

const Donor = new mongoose.Schema(
    {
            email:{type: String },
            name: {type: String },
            password: {type: String},
            number:{type: String },
            Add: {type: String  },
            dob: {type: String  },
            bloodGroup: {
                type:String,
                enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            },
            donated: Number,
            donatedAt:[],
    },


    {timestamps: true},
)

Donor.methods.toJSON = function(){
    let obj = this.toObject();
    delete obj.password
    return obj;
   }

export default mongoose.model("Donor", Donor);