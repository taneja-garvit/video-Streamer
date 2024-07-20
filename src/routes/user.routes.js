import { registerUser } from "../controllers/user.contoller.js";
import {Router} from 'express'
import {upload} from "../middlewares/multer.middleware.js"

const router= Router()

router.route("/register").post(
    upload.fields([               //middleware injected
       {
        name:"avtar",
        macCount:1,
       },
       {
        name:"image",
        macCount:1,
       }
    ]),
    registerUser)

export default router;