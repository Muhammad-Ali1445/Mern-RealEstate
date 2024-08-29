import User from "../models/user.model.js";
import bcriptjs from "bcryptjs";
export const signup = async (req, res,next) => {
  let { username, email, password } = req.body;
  const hashedPassword = bcriptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }

  // ---- custom generated error handler ---

  // catch (error) {
  //   next(errorHandler(550,'error form function'));
  // }
};
