import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan, { format } from "morgan";
import mongoose from 'mongoose';
import { StatusCodes } from "http-status-codes";

// cookie parser

import cookieParser from "cookie-parser";

 
// routes import
import authRouter from './routes/authRoutes.js';
import updateRouter from "./routes/updateRoute.js"
import donorAuthRouter from "./routes/donorAuthRoutes.js"

// middlewares
import errorHandler from "./middlewares/errorHandler.js";
import authenticateUser from "./middlewares/authenticateUser.js";





if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(errorHandler);
app.use(express.json());

// hospitals - routes

app.use("/bloodbank/update",authenticateUser, updateRouter)
app.use("/bloodbank/auth", authRouter)


// donor - routes
app.use("/donor/auth", donorAuthRouter)


// not found error..

app.use('*', (req, res) => {
  res.status(404).json({msg: "not found"});
});

// unexpected err...

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong"
  res.status(statusCode).json({msg});
})



const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
};

