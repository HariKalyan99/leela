import express from "express";
import { authUserLogin, authUserSignup } from "../controllers/authUser.controllers.js";

const router = express.Router();

router.post("/signup", authUserSignup);
router.post("/login", authUserLogin);

export default router;


