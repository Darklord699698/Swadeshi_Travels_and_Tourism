import express from "express";
import { handleContactForm } from "../controllers/contactController.js";

const router = express.Router();

router.post("/enquiry", handleContactForm);

export default router;
