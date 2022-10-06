import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post';

const createPost = (req: Request, res: Response, next: NextFunction) => {
  const { title, body, authorId, date } = req.body;

  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title,
    body,
    authorId,
    date
  });

  return post
    .save()
    .then((post) => res.status(201).json({ post }))
    .catch((error) => res.status(500).json({ error }));
};

const readPost = (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;

  return Post.findById(postId)
    .populate("authorId")
    .then((post) =>
      post
        ? res.status(200).json({ post })
        : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Post.find()
    .populate("authorId")
    .select("-__v")
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(500).json({ error }));
};

const updatePost = (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;

  return Post.findById(postId)
    .then((post) => {
      if (post) {
        post.set(req.body);

        return post
          .save()
          .then((post) => res.status(201).json({ post }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: 'not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deletePost = (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;

  return Post.findByIdAndDelete(postId)
    .then((post) =>
      post
        ? res.status(201).json({ post, message: 'Deleted' })
        : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createPost,
  readPost,
  readAll,
  updatePost,
  deletePost,
};
