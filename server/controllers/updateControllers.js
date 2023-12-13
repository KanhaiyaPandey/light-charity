import { StatusCodes } from "http-status-codes";
import BloodBank from "../models/BloodBank.js";

export const update = async (req, res) => {
    const { bloodGroup, quantity } = req.body;
    const toFind = bloodGroup;
  

    const result = req.user.inventory.find(blood => blood.bloodGroup === toFind);

    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Blood group not found in inventory" });
    }

    const totalQuantity = result.quantity + quantity;
    

  

    try {
        const bloodbank = await BloodBank.findOneAndUpdate(
            { _id: req.user.userId, 'inventory.bloodGroup': toFind },
            { $set: { 'inventory.$.quantity': totalQuantity } },
            { new: true }
        );

        req.user.inventory = bloodbank.inventory;

        if (bloodbank) {
            res.status(StatusCodes.OK).json({ msg: "Updated successfully", bloodbank });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ msg: "Blood group not found in inventory" });
        }
    } catch (error) {
        console.error('Error updating database:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error" });
    }
};