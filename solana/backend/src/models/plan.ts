import mongoose, { Schema, Document } from "mongoose";

export interface IPlan extends Document {
    planName: string;
    description:string;
    totalNoOfRequests: number;
    price: number;
}

const PlanSchema = new Schema({
  planName: { type: String, required: true },
  description: { type: String, required: true },
  totalNoOfRequests : { type: Number, required: true },
  price: { type: Number, required: true }
});

export default mongoose.model<IPlan>("Plan", PlanSchema);


