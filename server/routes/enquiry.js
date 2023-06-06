import express from "express"
import { getEnquiries, getEnquiriesBy, getEnquiry, getGroupByProperties, getGroupByUsers, makeEnquiry } from "../controllers/enquiry.js"
const router=express.Router()
router.post("/makeenquiry", makeEnquiry)
router.get("/getenquiry/:id", getEnquiry)

router.get("/getenquiriesby", getEnquiriesBy)

router.get("/all", getEnquiries)

router.get("/groupbyusers", getGroupByUsers)
router.get("/groupbyproperties", getGroupByProperties)



export default router;