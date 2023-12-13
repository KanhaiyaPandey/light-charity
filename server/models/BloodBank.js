import mongoose from "mongoose";


// const BloodBankSchema = new mongoose.Schema(
//     {

//        name:{type: String, require: true},
//        email: {type: String, require: true,},
//        password: {type: String, require: true},
//        doners: [],
//        inventory: [
//         {
//           bloodGroup: {
//             type: String,
//             default: "A+",
//             required: true,
//           },
//           quantity: {
//             type: Number,
//             default: 0,
//           },
//         },
//         {
//             bloodGroup: {
//               type: String,
//               default: "A-",
//               required: true,
//             },
//             quantity: {
//               type: Number,
//               default: 0,
//             },
//           },
//           {
//             bloodGroup: {
//               type: String,
//               default: "B+",
//               required: true,
//             },
//             quantity: {
//               type: Number,
//               default: 0,
//             },
//           },
//           {
//             bloodGroup: {
//               type: String,
//               default: "B-",
//               required: true,
//             },
//             quantity: {
//               type: Number,
//               default: 0,
//             },
//           },
//           {
//             bloodGroup: {
//               type: String,
//               default: "AB+",
//               required: true,
//             },
//             quantity: {
//               type: Number,
//               default: 0,
//             },
//           },
//           {
//             bloodGroup: {
//               type: String,
//               default: "AB-",
//               required: true,
//             },
//             quantity: {
//               type: Number,
//               default: 0,
//             },
//           },
//           {
//             bloodGroup: {
//               type: String,
//               default: "O+",
//               required: true,
//             },
//             quantity: {
//               type: Number,
//               default: 0,
//             },
//           },
//           {
//             bloodGroup: {
//               type: String,
//               default: "O-",
//               required: true,
//             },
//             quantity: {
//               type: Number,
//               default: 0,
//             },
//           },
//       ],
//  },
//     {timestamps: true},
// )

// export default mongoose.model("BloodBank", BloodBankSchema);



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