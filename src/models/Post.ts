import mongoose, { Document, Schema } from 'mongoose';

export interface IPost {
    title: string;
    body: string;
}

export interface IPostModel extends IPost, Document {}

const PostSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IPostModel>('Post', PostSchema);
