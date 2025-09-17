import mongoose, { Schema, Document } from "mongoose";
import { IDepartment } from "./Department";


export interface IEmployee extends Document {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    department: IDepartment["_id"];
    supervisor?: IEmployee["_id"];
    country: string;
    state?: string;
    city?: string;
}


const EmployeeSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        jobTitle: { type: String, required: true },
        department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
        supervisor: { type: Schema.Types.ObjectId, ref: "Employee", default: null },
        country: { type: String, required: true },
        state: { type: String },
        city: { type: String },
    },
    { timestamps: true }
);


export default mongoose.model<IEmployee>("Employee", EmployeeSchema);