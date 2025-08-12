import mongoose from "mongoose";
export const roles = {
  admin : "admin",
  member : "member"
}
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role : {
      type : String,
      required: true,
      enum : Object.values(roles)
    }
  },
  {
    timestamps: {
      createdAt : true
    },
    optimisticConcurrency: true,
  }
);
const User =  mongoose.model("User", userSchema)
export default User;