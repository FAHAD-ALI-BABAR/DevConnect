import { Router } from "express";
import { registerUser,loginUser, logoutUser, newrefreshaccesstoken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import JWTverify from "../middlewares/auth.middleware.js";
const router=Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }  
    ]),
    registerUser)

router.route("/login").post(loginUser)
router.route("/logout").post(JWTverify, logoutUser)
router.route("/refresh-token").post(newrefreshaccesstoken)    ;

export default router