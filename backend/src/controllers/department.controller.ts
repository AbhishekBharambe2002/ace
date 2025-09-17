import { Request, Response } from "express";
import Department from "../models/Department";
import { asyncHandler } from "../utils/asyncHandler";


export class DepartmentController {
    static getAllDepartments = asyncHandler(async (req: Request, res: Response) => {
        const departments = await Department.find();
        res.json(departments);
    });


    static createDepartment = asyncHandler(async (req: Request, res: Response) => {
        const { name } = req.body;
        const existing = await Department.findOne({ name });
        if (existing) {
            return res.status(400).json({ message: "Department already exists" });
        }
        const department = new Department({ name });
        await department.save();
        res.status(201).json(department);
    });


    static getDepartmentById = asyncHandler(async (req: Request, res: Response) => {
        const department = await Department.findById(req.params.id);
        if (!department) return res.status(404).json({ message: "Department not found" });
        res.json(department);
    });


    static updateDepartment = asyncHandler(async (req: Request, res: Response) => {
        const { name } = req.body;
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!department) return res.status(404).json({ message: "Department not found" });
        res.json(department);
    });


    static deleteDepartment = asyncHandler(async (req: Request, res: Response) => {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) return res.status(404).json({ message: "Department not found" });
        res.json({ message: "Department deleted" });
    });
}