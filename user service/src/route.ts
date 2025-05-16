import exress from 'express'
import { loginUser, myProfile, registerUser } from './controller.js';
import { IsAuth } from './middleware.js';
const router=exress.Router()


router.post("/user/register",registerUser)
router.post("/user/login",loginUser)
router.get("/user/me",IsAuth,myProfile)

export default router;