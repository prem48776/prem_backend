import express from "express";
import {  LoginUser, regesterUser } from "../controllers/Auth.js";
const router = express.Router();
 
router.post('/regesterUser',regesterUser)
router.post('/login',LoginUser)

export default router 