
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/customErrors.js";
import BloodBank from "../models/BloodBank.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { createJWT, verifyJWT } from "../utils/token.js";

export const register = async (req, res) => {
  
  
    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword;
    const bank = await BloodBank.create(req.body)
    res.status(201).json({ message: 'Blood inventory added successfully', bank:bank});
    };


    export const login = async (req, res) =>{
        const user = await BloodBank.findOne({email: req.body.email});  
        const isValidUser = user && (await comparePassword(req.body.password, user.password));
        if(!isValidUser) throw new UnauthenticatedError("invalid credentials");
    
          const token = createJWT({userId: user._id, inventory: user.inventory});
          const oneDay = 60*60*1000*24;
    
          res.cookie("token", token,{ 
          httpOnly: true,
          expires: new Date(Date.now() + oneDay),
          secure: process.env.NODE_ENV === "production"
          })
            res.status(StatusCodes.OK).json({msg: "logged in successfully"})
          
    };