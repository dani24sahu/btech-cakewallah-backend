import express from "express";
import passport from "passport";
import {
  getAdminUsers,
  getAdminStats,
  logout,
  myProfile,
  contact,
} from "../controllers/user.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google", { successRedirect: process.env.FRONTEND_URL })
);

router.get("/me", isAuthenticated, myProfile);
router.get("/logout", logout);
router.post("/contact", contact);

// Admin Routes

router.get("/admin/users", isAuthenticated, authorizedAdmin, getAdminUsers);
router.get("/admin/stats", isAuthenticated, authorizedAdmin, getAdminStats);

export default router;
