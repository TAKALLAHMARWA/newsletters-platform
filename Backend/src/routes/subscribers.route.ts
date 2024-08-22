import express from 'express';
import * as SubscriberController from '../controllers/subscribers.controller';

const router = express.Router();

router.get('/', SubscriberController.getSubscribers);
router.get('/:subscriberId', SubscriberController.getSubscriber);
router.post('/', SubscriberController.createSubscriber);

export default router;
