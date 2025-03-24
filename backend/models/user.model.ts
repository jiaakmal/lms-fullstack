require("dotenv").config();
import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  createdAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: ()=> string;
  SignRefreshToken: ()=> string;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      validate: {
        validator: (value: string) => emailRegex.test(value),
        message: "Please enter a valid email address",
      },
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [{ courseId: String }],
},
  {
    timestamps: true,
  }

);
// hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password as string, 10);
  next();
});


// Method to generate an access token
userSchema.methods.SignAccessToken = function (): string {
  return jwt.sign({ id: this._id} , process.env.ACCESS_TOKEN || "", {expiresIn: "5min"})
}

// Method to generate a refresh token
userSchema.methods.SignRefreshToken = function (): string {
  return jwt.sign({ id: this._id} , process.env.REFRESH_TOKEN || "", {expiresIn: "3d"})
}



// compare password 
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default userModel;
