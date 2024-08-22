import { RequestHandler } from 'express';
import User from '../models/users.model';

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await User.find().exec();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const createUser: RequestHandler = async (req, res, next) => {
    const { username, email, password, profilePicture } = req.body;
    try {
        const newUser = await User.create({
            username,
            email,
            password,
            profilePicture
        });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

export const updateUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.userId;
    const updateData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await User.findByIdAndDelete(userId).exec();
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};
