import React, { useEffect, useState } from "react";
import { employeeApi } from "../api/employeeApi";
import { Employee } from "../types/employee";
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";

const EmployeesPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [open, setOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

    const fetchEmployees = async () => {
        const res = await employeeApi.getAll();
        const employeesArray = Array.isArray(res.data.data) ? res.data.data : [];
        setEmployees(employeesArray);
    };

    const handleDelete = async (id: string) => {
        await employeeApi.delete(id);
        fetchEmployees();
    };

    const handleUpdateClick = (emp: Employee) => {
        setCurrentEmployee(emp);
        setOpen(true);
    };

    const handleUpdateSave = async () => {
        if (currentEmployee && currentEmployee._id) {
            await employeeApi.update(currentEmployee._id, currentEmployee);
            setOpen(false);
            fetchEmployees();
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Employees
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((emp) => (
                        <TableRow key={emp._id}>
                            <TableCell>{emp.firstName}</TableCell>
                            <TableCell>{emp.lastName}</TableCell>
                            <TableCell>{emp.email}</TableCell>
                            <TableCell>{emp.jobTitle}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleUpdateClick(emp)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => emp._id && handleDelete(emp._id)}
                                    disabled={!emp._id}
                                    sx={{ ml: 1 }}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Update Modal */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Update Employee</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="First Name"
                        fullWidth
                        value={currentEmployee?.firstName || ""}
                        onChange={(e) =>
                            setCurrentEmployee({ ...currentEmployee!, firstName: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        value={currentEmployee?.lastName || ""}
                        onChange={(e) =>
                            setCurrentEmployee({ ...currentEmployee!, lastName: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={currentEmployee?.email || ""}
                        onChange={(e) =>
                            setCurrentEmployee({ ...currentEmployee!, email: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Job Title"
                        fullWidth
                        value={currentEmployee?.jobTitle || ""}
                        onChange={(e) =>
                            setCurrentEmployee({ ...currentEmployee!, jobTitle: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdateSave} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EmployeesPage;
