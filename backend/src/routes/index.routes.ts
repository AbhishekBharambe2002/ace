import { Router } from "express";
import departmentRoutes from "./department.routes";
import employeeRoutes from "./employee.routes";

const router = Router();

router.use("/departments", departmentRoutes);
router.use("/employees", employeeRoutes);
console.log("routes loaded")
export default router;