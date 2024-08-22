import express from "express";
import * as NewsletterController from "../controllers/newsletters.controller";

const router = express.Router();
router.get("/" ,NewsletterController.getnewsletters);
router.get("/:newsletterId",NewsletterController.getnewsletter);
 router.post("/", NewsletterController.creatNewsletters)
export default router;