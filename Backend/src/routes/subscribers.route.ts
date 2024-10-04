import express from 'express';
import * as SubscriberController from '../controllers/subscribers.controller';


const router = express.Router();

router.post('/', SubscriberController.createSubscriber);
router.get('/:newsLetterOwnerId', SubscriberController.getSubscribers);
router.get('/', SubscriberController.subscribersAnalytics);

export default router;
