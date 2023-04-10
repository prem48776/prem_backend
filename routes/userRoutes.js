import express from "express";
import { DeleteUser, GetUsers, UnfollowUser, UserUpdate, followUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", GetUsers);
router.put('/:id',UserUpdate)
router.delete("/:id",DeleteUser)
router.put("/:id/follow",followUser)
router.put("/:id/unfollow",UnfollowUser)

export default router;
