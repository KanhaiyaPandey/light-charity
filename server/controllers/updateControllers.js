import { StatusCodes } from "http-status-codes";
import BloodBank from "../models/BloodBank.js";
import Donor from "../models/Donor.js";
import { hashPassword } from "../utils/password.js";
import { BadRequestError } from "../errors/customErrors.js";


export const update = async (req, res) => {
    const { bloodGroup, quantity } = req.body;
    const toFind = bloodGroup;

    const result = await req.user.inventory.find(blood => blood.bloodGroup === toFind);

    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Blood group not found in inventory" });
    }

    try {
        const bloodbank = await BloodBank.findOneAndUpdate(
            { _id: req.user.userId, 'inventory.bloodGroup': toFind },
            { $inc: { 'inventory.$.quantity': quantity } }, 
            { new: true }
        );
    
        req.user.inventory = bloodbank.inventory;
    
        if (req.user.inventory) {
            res.status(StatusCodes.OK).json({ msg: "Updated successfully", inventory: bloodbank.inventory});
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ msg: "Blood group not found in inventory" });
        }
    } catch (error) {
        console.error('Error updating database:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
    }
};

export const createDonor = async (req, res) => {
    try {
      const { email } = req.body;
  

      const existingDonor = await Donor.findOne({ email });
      if (existingDonor) {
        throw new BadRequestError("Email already exists");
      }

      const hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
  

      const donor = await Donor.create(req.body);
  
      const bloodBank = await BloodBank.findOneAndUpdate(
        { _id: req.user.userId }, 
        { $push: { donors: donor._id } }, 
        { new: true }
      );
  
      res.status(StatusCodes.OK).json({ message: 'Registered successfully', donor, bloodBank });
    } catch (error) {
      console.error('Error creating donor:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };