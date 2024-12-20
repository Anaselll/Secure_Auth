import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import transporter from "../config/nodemailer.js";
import { generateToken,verifyToken } from "../utils/jwt.js";

export async function register(req, res) {
  

  const { username, gmail, password } = req.body;
  
  try {
     const user=await User.findOne({gmail})
     if(user){
      return res.status(400).json({message:"User already exists"})
      }

    const token_verify = generateToken({username,gmail,password }, "1h");
    const verifyLink = `http://localhost:5000/auth/verifyEmail/${token_verify}`;
    const mailOptions = {
      from: "consoleone111111111@gmail.com",
      to: gmail,
      subject: "Verify Email Request",
      text: `Please verify your email by clicking the link below:\n${verifyLink}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("no erororkfpoe")
    
    res.status(200).send({ message: "User successfully registered" });
  } catch (error) {
    console.log(1)
    res.status(404).send({ message: `Error while registering user ${error}` });
  }
}
export const login = async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const user = await User.findOne({ gmail });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = generateToken(
      { id: user._id, gmail: user.gmail },
      "1m"
    );
    const refreshToken = generateToken(
      { id: user._id, gmail: user.gmail },
      "7d"
    );

    user.refreshToken = refreshToken;
    user.accessToken=accessToken
    await user.save();

    res.status(200).json({
      message: "Login successful",
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    res.status(500).send({ message: "Error while logging in", error });
  }
};
export const  SuccessReg=(req,res)=>{
  return res.redirect("http://localhost:5173/register/success")

}

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = verifyToken(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateToken(
      { id: user._id, gmail: user.gmail },
      "7d"
    );

    res.status(200).json({ access_token: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token", error });
  }
};

export const logout = async (req, res) => {
  const { id } = req.body;

  try {
    await User.findByIdAndUpdate(id, { refreshToken: null });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error while logging out", error });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
   

    const user = await User.findOne({ gmail: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateToken({ id: user._id }, "1h");
    user.resetToken = resetToken;
    await user.save();

    const resetLink = `http://localhost:5000/auth/reset/password/index/${resetToken}`;

    await transporter.sendMail({
      from:"consoleone111111111@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    });

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while processing password reset", error });
  }
};
export const resetPasswordIndex=(req,res)=>{
  const {token}=req.params;
  return res.redirect(`http://localhost:5173/reset/password/${token}`);
    
}
export const resetPasswordStore = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = verifyToken(token);
    const user = await User.findOne({ _id: decoded.id, resetToken: token });

    if (!user || user.resetTokenExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: "Error while resetting password", error });
  }
};
export const verifyEmail=async(req,res)=>{
  const {token}=req.params;
  try {
    const decoded=verifyToken(token);
    const user=await User.findOne({gmail:decoded.gmail});
    let user_model
      
    const hashedPassword = await bcrypt.hash(decoded.password, 10);
    
    if(!user){
      user_model=new User(
        {
          username:decoded.username,
          gmail:decoded.gmail,
          password:hashedPassword,
          verifyEmail:true
          

        }
      )
      await user_model.save()
            return res.redirect(
              "http://localhost:5173/register/success?status=verified"
            );

      }else if (user.verifyEmail) {
        res.status(400).json({ message: "Email already verified" });   return res.redirect(
          "http://localhost:5173/register/success?status=already_verified"
        );}
      
      } catch (error) {
        return res.redirect(
          "http://localhost:5173/register/success?status=failed"
        );
        }

}