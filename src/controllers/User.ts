import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Logging from '../library/Logging';
import User from '../models/User';

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { uid, name } = req.body;
  const fire_token = res.locals.fire_token;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    uid,
    name,
  });

  return user
    .save()
    .then((user) => res.status(201).json({ user, fire_token }))
    .catch((error) => res.status(500).json({ error }));
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  Logging.info('Logging in user ...');

  const { uid } = req.body;
  const fire_token = res.locals.fire_token;

  return User.findOne({ uid })
    .then((user) => {
      if (user) {
        Logging.info(`User ${uid} found, signing in...`);
        return res.status(200).json({ user, fire_token });
      } else {
        Logging.info(`User ${uid} not found, register...`);
        return createUser(req, res, next);
      }
    })
    .catch((error) => {
      Logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  Logging.info('Token validated, returning user ...');

  let firebase = res.locals.Firebase;
  return User.findOne({ uid: firebase.uid })
    .then((user) => {
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(401).json({ message: 'user not found' });
      }
    })
    .catch((error) => {
      Logging.error(error);

      return res.status(500).json({ error });
    });
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);

        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: 'not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? res.status(201).json({ user, message: 'Deleted' })
        : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createUser,
  validateUser,
  loginUser,
  readUser,
  readAll,
  updateUser,
  deleteUser,
};
