import { Email } from "@mui/icons-material";
import mongoose from "mongoose";


const Donor = new mongoose.Schema(
    {
            email: String,
            name: String,
            Add: String,
            DOB: String,
            Bg: String,
            donated: Number,
    },

    {timestamps: true},
)

export default mongoose.model("Donor", Donor);