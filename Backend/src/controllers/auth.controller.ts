import { Request, Response, NextFunction } from 'express';
import User from '../models/users.model';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error';
import jwt from 'jsonwebtoken';
export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET as string
    );

    // Crée une nouvelle copie de l'objet sans le champ 'password'
    const userResponse = { ...validUser.toObject(), password: undefined };

    res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(userResponse);
  } catch (error) {
    next(error);
  }
};

export const google = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string
      );

      const userResponse = { ...user.toObject(), password: undefined };
      res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(userResponse);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET as string
      );

      const userResponse = { ...newUser.toObject(), password: undefined };
      res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(userResponse);
    }
  } catch (error) {
    next(error);
  }
};
