import express from "express";
import { getFeedback, getFeedbacks, returnFeedback } from "../controllers/feedback.js";


const router = express.Router();

router.get("/all", getFeedbacks);
router.get("/getfeedback/:id", getFeedback);
router.post("/returnfeedback", returnFeedback);


export default router;