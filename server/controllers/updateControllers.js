import { StatusCodes } from "http-status-codes";
import BloodBank from "../models/BloodBank.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

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