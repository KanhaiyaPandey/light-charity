import { StatusCodes } from "http-status-codes";
import Donor from "../models/Donor.js";
import { hashPassword } from "../utils/password.js";

export const DonorRegister = async (req, res) => {
    const { email } = req.body;
      const existingDonor = await Donor.findOne({ email });
      if (existingDonor) {
         throw new BadRequestError("email already existed")
      }
      const hashedPassword = await hashPassword(req.body.password)
      req.body.password = hashedPassword;
      const donor = await Donor.create(req.body)
      res.status(StatusCodes.OK).json({ message: 'registered successfully' , donor: donor});
      
      };