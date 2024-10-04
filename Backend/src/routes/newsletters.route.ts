import express from 'express';
import * as NewsletterController from "../controllers/newsletters.controller";

const router = express.Router();
router.post("/save",NewsletterController.saveNewsletter);
router.get("/:newsLetterOwnerId",NewsletterController.getNewsletter);
 router.put('/:newsletterId', NewsletterController.updateNewsletter );
router.delete('/:newsletterId',NewsletterController.deleteNewsletter );
router.get('/details', NewsletterController.getNewsletterDetails);
router.post('/send-email', NewsletterController.sendNewsletterEmail);
export default router;

  