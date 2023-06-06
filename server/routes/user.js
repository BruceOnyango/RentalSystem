import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";


const router = express.Router();

router.get("/all", getUsers);
router.get("/getuser/:id", getUser);
router.delete("/delete/:id", deleteUser);
router.put("/updatedetails/:id", updateUser);

export default router;