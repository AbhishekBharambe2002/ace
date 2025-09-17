import { Request, Response } from "express";
import Employee from "../models/Employee";
import { asyncHandler } from "../utils/asyncHandler";

export class EmployeeController {
    static getEmployees = asyncHandler(async (req: Request, res: Response) => {
        const { page = 1, limit = 10, search = "", department, jobTitle } = req.query;

        const query: any = {};
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }
        if (department) query.department = department;
        if (jobTitle) query.jobTitle = jobTitle;

        const employees = await Employee.find(query)
            .populate("department")
            .populate("supervisor")
            .skip((+page - 1) * +limit)
            .limit(+limit);

        const total = await Employee.countDocuments(query);

        res.json({
            data: employees,
            total,
            page: +page,
            totalPages: Math.ceil(total / +limit),
        });
    });

    static createEmployee = asyncHandler(async (req: Request, res: Response) => {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    });

    static getEmployeeById = asyncHandler(async (req: Request, res: Response) => {
        const employee = await Employee.findById(req.params.id)
            .populate("department")
            .populate("supervisor");
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.json(employee);
    });

    static updateEmployee = asyncHandler(async (req: Request, res: Response) => {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .populate("department")
            .populate("supervisor");
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.json(employee);
    });

    static deleteEmployee = asyncHandler(async (req: Request, res: Response) => {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.json({ message: "Employee deleted" });
    });
}