import mongoose from "mongoose";

const { Schema } = mongoose;

const BloodBankSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    doners: [],
    inventory: [
      {
        bloodGroup: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);


BloodBankSchema.pre("save", function (next) {
  const defaultBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  this.inventory = defaultBloodGroups.map((bloodGroup) => ({
    bloodGroup,
    quantity: 0,
  }));

  next();
});

export default mongoose.model("BloodBank", BloodBankSchema);