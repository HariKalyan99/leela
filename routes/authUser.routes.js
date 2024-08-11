import express from "express";
import { authUserSignup } from "../controllers/authUser.controllers.js";

const router = express.Router();

router.post("/signup", authUserSignup)

export default router;


