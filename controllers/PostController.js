import postModel from "../model/UserPostModel.js";
import UserModel from "../model/UserModel.js";
import mongoose from "mongoose";

// create post routes
export const CreateUser = async (req, res) => {
  const newPost = new postModel(req.body);

  try {
    await newPost.save();
    return res.status(200).json({ message: "Post success !" });
  } catch (error) {
    return res.status(500).json({ message: "internal error !" });
  }
};

// read user post

export const getUserPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await postModel.findById(id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update a post routes

export const UpdateUserPost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await postModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ message: "Update success !" });
    } else {
      return res.status(403).json({ message: "It is not your post" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete post user routes

export const DeleteUserPost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const deletepost = await postModel.findById(postId);
    if (deletepost.userId === userId) {
      await deletepost.deleteOne();
      return res.status(200).json({ message: "Delete this Post" });
    } else {
      return res.status(403).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// like a post user

export const LikePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await postModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ message: "like" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ message: "unlike" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//timeline post
export const TimeLinePost = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPost = await postModel.find({ userId: userId });
    const followingPost = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPost",
        },
      },
      {
        $project: {
          followingPost: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserPost.concat(...followingPost[0].followingPost).sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
