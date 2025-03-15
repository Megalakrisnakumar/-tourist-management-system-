import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

export const requireSignIn = async (req, res, next) => {
 next()
};

//Admin access
export const isAdmin = async (req, res, next) => {
  // console.log(req.user.id);
   next()
};
