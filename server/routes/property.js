import express from "express";
import {
  addProperty,
  deleteProperty,
  getProperty,
  getProperties,
  updateProperty,
  getPropertiesByUser,
  getApprovedProperties,
  pendingPayment,
  updateValuated,
  saveProperty,
  getPropertiesSaved,
  findifSaved,
  deleteSaved,
  pendingApproval,
  pendingApprovalOrApproved,
  updateApproved,
  updateDeclined,
  saveProcess,
  deleteProcess,
  getProcess,
  updateTransfer,
  getUserProcess,
  getSales,
  getSumPropertySales,
  getUserProcessUp,
  newSale,
  getSalesUserProperty,
  newSaleSeller,
  updateSearch,
  getSalesUserPropertyAll,
  getApprovedPropertiesAvailable,
  updatePropertyAvailable,
} from "../controllers/property.js";

const router = express.Router();

router.get("/all", getProperties);
router.get("/approved", getApprovedProperties);
router.get("/available", getApprovedPropertiesAvailable);
router.post("/by", getPropertiesByUser);
router.post("/saveproperty", saveProperty);

router.post("/startprocess", saveProcess);

router.get("/allsales", getSales);
router.get("/propertysales", getSumPropertySales);
router.get("/propertysalesuser", getSalesUserProperty);
router.get("/propertysalesuserall", getSalesUserPropertyAll);

router.get("/getprocess", getProcess);
router.get("/getprocessby/:id", getUserProcess);

router.get("/getprocessbyup/:id", getUserProcessUp);

router.put("/updatetransfer/:id", updateTransfer);
router.put("/updatesales/:id", updatePropertyAvailable);
router.put("/updatesearch/:id", updateSearch);

router.post("/pendingpayment", pendingPayment);
router.post("/newsale",newSale);
router.post("/newsaleseller",newSaleSeller);
router.get("/pendingapproval", pendingApproval);
router.get("/pendingapprovalapproved", pendingApprovalOrApproved);
router.get("/:id", getProperty);
router.get("/getsaved/:id", getPropertiesSaved);
router.get("/findsaved/:id", findifSaved);
router.post("/addproperty", addProperty);
router.delete("/deleteproperty/:id", deleteProperty);
router.delete("/deleteprocess/:id", deleteProcess);

router.delete("/deletesaved/:id", deleteSaved);
router.put("/updateproperty/:id", updateProperty);
router.put("/updateValuated/:id", updateValuated);
router.put("/updateapproved/:id", updateApproved);
router.put("/updatedeclined/:id", updateDeclined);

export default router;