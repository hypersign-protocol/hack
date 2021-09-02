import mongoose, { Schema, Document } from "mongoose";

export interface IUsage extends Document {
  userDid: string;
  totalAvailable: number; //1000 + limt
  totalUsed: number; //0
}

const UsageSchema = new Schema({  
  userDid: { type: String, required: true },
  totalAvailable: { type: Number, required: true },
  totalUsed: { type: Number, required: true }
});

export default mongoose.model<IUsage>("Usage", UsageSchema);


