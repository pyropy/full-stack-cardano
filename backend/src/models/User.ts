import { Document, model, Schema } from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param address:string
 */
export interface IUser extends Document {
  address: string;
}

const userSchema: Schema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default model<IUser>("User", userSchema);

