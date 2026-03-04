import { Router } from "express";
import { upload } from "../middlewire/multer.middlewire.js";
import { registeruser } from "../controlers/user.controlers.js";

const router=Router();
router.route("/register").post(
    upload.fields([
        {name:"avatar",
            maxCount:1
        },
        {name:"image",
            maxCount:1
        }
    ])


   , registeruser
)

export default router;
