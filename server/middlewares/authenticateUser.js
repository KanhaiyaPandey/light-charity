import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/token.js";

export const authenticateBloodbank = async (req, res, next) =>{
  const {token} = req.cookies;
  if(!token) throw new UnauthenticatedError("you are not authorized for this route");
  try {
     const {userId, inventory, donors} = verifyJWT(token);
     req.user = {userId,inventory, donors}
     next();
  } catch (error) {
    throw new UnauthenticatedError("you are not authorized for this route");
  }
}





export const authenticateDonor = async (req, res, next) =>{
  const {token} = req.cookies;
  if(!token) throw new UnauthenticatedError("you are not authorized for this route");
  try {
     const {donorId, donatedAt } = verifyJWT(token);
     req.user = {donorId, donatedAt}
     next();
  } catch (error) {
    throw new UnauthenticatedError("you are not authorized for this route");
  }
}



