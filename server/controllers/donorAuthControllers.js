import { StatusCodes } from "http-status-codes";
import Donor from "../models/Donor.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { BadRequestError, UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/token.js";
import nodemailer from "nodemailer"

let donor = {};
  

export const DonorRegister = async (req, res) => {
    const { email } = req.body;
      const existingDonor = await Donor.findOne({ email });
      if (existingDonor) {
         throw new BadRequestError("email already existed")
      }
      const hashedPassword = await hashPassword(req.body.password)
      req.body.password = hashedPassword;
      donor = req.body;
        

      const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
          user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
          pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
        },
      })


      res.status(StatusCodes.OK).json({ message: 'registered successfully' , donor: donor});

      };



      export const DonorRegisterVerify = async (req, res) =>{
        const {otp} = req.body;
        if(!otp) throw new BadRequestError("enter the otp");
        if(otp !== OTP) throw new BadRequestError("otp is incorrect");
        await Donor.create(donor);
        res.status(StatusCodes.OK).json({ message: 'registered successfully'});
      }





      export const DonorLogin = async(req, res) => {

         const donor = await Donor.findOne({email: req.body.email});  
         const isValidUser = donor && (await comparePassword(req.body.password, donor.password));
         if(!isValidUser) throw new UnauthenticatedError("invalid credentials");
     
           const donorToken = createJWT({donorId: donor._id, donatedAt : donor.donatedAt});
           const oneDay = 60*60*1000*24;
     
           res.cookie("donorToken", donorToken,{ 
           httpOnly: true,
           expires: new Date(Date.now() + oneDay),
           secure: process.env.NODE_ENV === "production"
           })
             res.status(StatusCodes.OK).json({msg: "logged in successfully"})
      }