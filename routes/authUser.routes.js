import express from "express";
import { authUserLogin, authUserLogout, authUserSignup, getMe } from "../controllers/authUser.controllers.js";
import { validateAuthorization } from "../middlewares/authorization.middlewares.js";

const router = express.Router();

router.get("/me", validateAuthorization, getMe)
router.post("/signup", authUserSignup);
router.post("/login", authUserLogin);
router.post("/logout", authUserLogout);

export default router;


