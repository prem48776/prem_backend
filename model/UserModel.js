import mongoose from "mongoose";

const Userschema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    IsAdmin: {type: Boolean ,default:false} ,
    followers:[],
    following:[],
    profile: String,
    address: String ,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", Userschema);
export default UserModel;
