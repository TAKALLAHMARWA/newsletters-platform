import { RequestHandler } from 'express';
import Subscriber from '../models/subscribers.model';

export const getSubscribers: RequestHandler = async (req, res, next) => {
    try {
        const subscribers = await Subscriber.find().exec();
        res.status(200).json(subscribers);
    } catch (error) {
        next(error);
    }
};

export const getSubscriber: RequestHandler = async (req, res, next) => {
    const subscriberId = req.params.subscriberId;
    try {
        const subscriber = await Subscriber.findById(subscriberId).exec();
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        res.status(200).json(subscriber);
    } catch (error) {
        next(error);
    }
};

export const createSubscriber: RequestHandler = async (req, res, next) => {
    const { email, newsLetterOwnerId, source, status } = req.body;
    try {
        const newSubscriber = await Subscriber.create({
            email,
            newsLetterOwnerId,
            source,
            status
        });
        res.status(201).json(newSubscriber);
    } catch (error) {
        next(error);
    }
};
