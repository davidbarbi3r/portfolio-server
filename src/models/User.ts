import mongoose, {Document, Schema} from "mongoose";

export interface IUser {
    uid: string,
    name: string,
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema (
    {
        uid: {type: String, unique: true},
        name: {type: String, required: true}
    }, 
    {
        versionKey: false
    }
)

export default mongoose.model<IUserModel>("User", UserSchema)