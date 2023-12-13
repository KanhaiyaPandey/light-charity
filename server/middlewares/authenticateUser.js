import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/token.js";

const authenticateUser = async (req, res, next) =>{
  const {token} = req.cookies;
  if(!token) throw new UnauthenticatedError("you are not authorized for this route");
  try {
     const {userId, inventory} = verifyJWT(token);
     req.user = {userId,inventory}
     next();
  } catch (error) {
    throw new UnauthenticatedError("you are not authorized for this route");
  }
}

export default authenticateUser;