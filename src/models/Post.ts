import mongoose, { Document, Schema } from 'mongoose';

export interface IPost {
  title?: string;
  body: string;
  authorId: string;
  date: Date
  description?: string
  tags?: string
  images?: string
}

export interface IPostModel extends IPost, Document {}

const PostSchema: Schema = new Schema(
  {
    title: { type: String },
    tags: {type: String},
    body: { type: String, required: true },
    description: {type: String}, 
    authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    date: {type: Date},
    images: {type: String}
  },
  {
    timestamps: true,
    // versionKey: "true",
  }
);

export default mongoose.model<IPostModel>('Post', PostSchema);
