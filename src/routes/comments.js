import { Router } from "express";
import {
    createComment,
    deleteComment,
    getCommentById,
    getCommentByName,
    getComments,
    getCommentsBySearch,
    updateComment,
} from "../controllers/Comment.js";
import { isAuth } from "../middleware/Auth.js";
import { isCommentOwner } from "../middleware/Comment.js";

const router = Router();

router.get("/", getComments);
router.get("/:id", getCommentById);
router.get("/q/:query", getCommentsBySearch);
router.get("/name/:slug", getCommentByName);
router.post("/", isAuth, createComment);
router.put("/:id", isAuth, isCommentOwner, updateComment);
router.delete("/:id", isAuth, isCommentOwner, deleteComment);

export default router;
