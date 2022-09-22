import mongoose, { Document, Schema } from 'mongoose';

export interface IPost {
  title?: string;
  content: string;
  author: string;
  date: Date;
}

export interface IPostModel extends IPost, Document {}

const PostSchema: Schema = new Schema(
  {
    title: { type: String},
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    date: {type: Date}
  },
  {
    timestamps: true,
    // versionKey: "true",
  }
);

export default mongoose.model<IPostModel>('Post', PostSchema);
