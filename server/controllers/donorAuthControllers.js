import { StatusCodes } from "http-status-codes";
import Donor from "../models/Donor.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/token.js";

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

      export const DonorLogin = async(req, res) => {

         const user = await Donor.findOne({email: req.body.email});  
         const isValidUser = user && (await comparePassword(req.body.password, user.password));
         if(!isValidUser) throw new UnauthenticatedError("invalid credentials");
     
           const token = createJWT({userId: user._id, donatedAt : user.donatedAt});
           const oneDay = 60*60*1000*24;
     
           res.cookie("token", token,{ 
           httpOnly: true,
           expires: new Date(Date.now() + oneDay),
           secure: process.env.NODE_ENV === "production"
           })
             res.status(StatusCodes.OK).json({msg: "logged in successfully"})
      }