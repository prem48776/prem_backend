import express from "express"
import { CreateUser, DeleteUserPost, LikePost, TimeLinePost, UpdateUserPost, getUserPost } from "../controllers/PostController.js"

const router = express.Router()

router.post("/addPost",CreateUser)
router.get("/:id",getUserPost)
router.put("/:id",UpdateUserPost)
router.delete("/:id",DeleteUserPost)
router.put("/:id/like",LikePost)
router.get("/:id/timeline",TimeLinePost)
export default router