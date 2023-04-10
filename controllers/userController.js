import UserModel from "../model/UserModel.js";
import bcrypt from "bcrypt";

//get user routes
export const GetUsers = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json({ message: "user not found !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update user routes
export const UserUpdate = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, CurrentUserAdminStatus, password } = req.body;

  if (id === currentUserId || CurrentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ message: "unOthoridge" });
    }
  } else {
    return res
      .status(501)
      .json({ message: "your Ip disconnected from this system" });
  }
};

//delete user routes

export const DeleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, CurrentUserAdminStatus } = req.body;

  if (id === currentUserId || CurrentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      return res.status(200).json({ message: "delete acccount successfull" });
    } catch (error) {
      return res.status(403).json({
        message: "You must be a user and then you and delete your own account",
      });
    }
  } else {
    return res.status(403).json({
      message: "You must be a user and then you and delete your own account",
    });
  }
};

//follow a user
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (id === currentUserId) {
    return res.status(403).json({ message: "you can't follow your self" });
  } else {
    try {
      const follow_user = await UserModel.findById(id);
      const following_user = await UserModel.findById(currentUserId);
      if (!follow_user.followers.includes(currentUserId)) {
        await follow_user.updateOne({$push :{followers :currentUserId}})
        await following_user.updateOne({$push :{following :id}})
        return res.status(200).json({message:"follow done"})
      }else{
        return res.status(403).json({message:"You are already following"})
      }
    } catch (error) {
      return res.status(500).json({message:"Please Login first"})
    }
  }
};

//unfollow routes
export const UnfollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (id === currentUserId) {
    return res.status(403).json({ message: "you can't follow your self" });
  } else {
    try {
      const follow_user = await UserModel.findById(id);
      const following_user = await UserModel.findById(currentUserId);
      if (follow_user.followers.includes(currentUserId)) {
        await follow_user.updateOne({$pull :{followers :currentUserId}})
        await following_user.updateOne({$pull :{following :id}})
        return res.status(200).json({message:"unfollow done"})
      }else{
        return res.status(403).json({message:"You are not followers"})
      }
    } catch (error) {
      return res.status(500).json({message:"Please Login first"})
    }
  }
};
