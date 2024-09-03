import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// ------------ Signup -----------------

export const signup = async (req, res, next) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// ------------- SignIn ---------------

export const signIn = async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const validUser = await User.findOne({ email: email });

    if (!validUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Credentials" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ success: true, message: "Login successful", user: rest });
    // .json(rest);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ------------ Google OAuth --------------

export const google = async (request, res, next) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          success: true,
          message: "Login successful through Google",
          user: rest,
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          request.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: request.body.email,
        password: hashedPassword,
        avatar: request.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const { password: pass, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          success: true,
          message: "Login successful through Google",
          user: rest,
        });
    }
  } catch (error) {
    next(error);
  }
};
