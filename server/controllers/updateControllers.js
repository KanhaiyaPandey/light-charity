import { StatusCodes } from "http-status-codes";
import BloodBank from "../models/BloodBank.js";
import Donor from "../models/Donor.js";
import { hashPassword } from "../utils/password.js";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";


export const getDonors = async (req, res) => {
  
  try {

    const bloodBank = await BloodBank.findById(req.user.userId);

    if (bloodBank) {
      const donors = bloodBank.donors || [];

      res.status(200).json({ donors });
    } else {

      throw new NotFoundError("Blood Bank not found");
    }
  } catch (error) {

    console.error('Error fetching donors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }


}


export const update = async (req, res) => {
    const {  quantity , email } = req.body;
    const existingDonor = await Donor.findOne({ email }).select("-password -donatedAt -createdAt -updatedAt -__v");
   
    if(!existingDonor){
      throw new BadRequestError("no donor found");
    }
    existingDonor.donated = quantity;
    await BloodBank.findOneAndUpdate(
      { _id: req.user.userId }, 
      { $push: { donors: existingDonor } }, 
      { new: true }
    );

    const bloodbank = await BloodBank.findOneAndUpdate(
      { _id: req.user.userId, 'inventory.bloodGroup': existingDonor.bloodGroup },
      { $inc: { 'inventory.$.quantity': quantity } }, 
      { new: true }
  );

      await Donor.findOneAndUpdate(
    { _id: existingDonor._id},
    { $inc: { 'donated': quantity } },  
    { new: true }
);

    res.status(StatusCodes.OK).json({ msg: 'Inventory Updated' ,bloodbank})

};







export const createDonor = async (req, res) => {
    try {
      const { email, bloodGroup, donated, number } = req.body;
      const existingDonor = await Donor.findOne({ email });
      if (existingDonor) {
        const donorToadd = req.body;

        await BloodBank.findOneAndUpdate(
        { _id: req.user.userId }, 
        { $push: { donors: donorToadd } }, 
        { new: true }
      );

      const bloodbank = await BloodBank.findOneAndUpdate(
        { _id: req.user.userId, 'inventory.bloodGroup': bloodGroup },
        { $inc: { 'inventory.$.quantity': donated } }, 
        { new: true }
    );

    const donor = await Donor.findOneAndUpdate(
      { _id: existingDonor._id},
      { $inc: { 'donated': donated } }, 
      { new: true }
  );

      res.status(StatusCodes.OK).json({ msg: 'donor added to donors list' ,bloodbank})

      }else{
      const donorToadd = req.body;

        await BloodBank.findOneAndUpdate(
        { _id: req.user.userId }, 
        { $push: { donors: donorToadd } }, 
        { new: true }
      );

      req.body.password = number;
      const hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
      const donor = await Donor.create(req.body);

      const bloodbank = await BloodBank.findOneAndUpdate(
        { _id: req.user.userId, 'inventory.bloodGroup': bloodGroup },
        { $inc: { 'inventory.$.quantity': donated } }, 
        { new: true }
    );

      res.status(StatusCodes.OK).json({ msg: 'donor registered successfully and added to donors list' ,bloodbank});
    }
    } catch (error) {
      console.error('Error creating donor:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };