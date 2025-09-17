import { Router } from "express";
import { DepartmentController } from "../controllers/department.controller";

const router = Router();

router.get("/", DepartmentController.getAllDepartments);
router.post("/", DepartmentController.createDepartment);
router.get("/:id", DepartmentController.getDepartmentById);
router.put("/:id", DepartmentController.updateDepartment);
router.delete("/:id", DepartmentController.deleteDepartment);
console.log("department routes loaded");
export default router;