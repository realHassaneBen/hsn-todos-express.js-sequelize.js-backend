import { Router } from "express";
import {
    login,
    register,
    profile,
    logout,
    logoutSession,
} from "../controllers/Auth.js";
import {
    isAuth,
    isEmailExist,
    isGuest,
    isUsernameTaken,
} from "../middleware/Auth.js";

const router = Router();

router.post("/login", isGuest, login);
router.get("/me", isAuth, profile);

router.post("/register", isGuest, isEmailExist, isUsernameTaken, register);

router.get("/login/failure", isGuest, (req, res, next) => {
    return res.status(401).json({
        message: "Invalid username or password",
    });
});
router.get("/login/success", isAuth, (req, res, next) => {
    return res.status(200).json({
        message: "Login successful",
    });
});

router.get("/logout", logout, logoutSession);

export default router;
