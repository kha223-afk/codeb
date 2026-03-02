import { Router } from "express";
import { registeruser } from "../controlers/user.controlers.js";

const router=Router();
router.route("/register").post(registeruser)

export default router;
