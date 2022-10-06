import mongoose, { Document, Schema } from 'mongoose';

export interface IPost {
  title?: string;
  body: string;
  authorId: string;
  date: Date;
}

export interface IPostModel extends IPost, Document {}

const PostSchema: Schema = new Schema(
  {
    title: { type: String },
    body: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    date: {type: Date}
  },
  {
    timestamps: true,
    // versionKey: "true",
  }
);

export default mongoose.model<IPostModel>('Post', PostSchema);
