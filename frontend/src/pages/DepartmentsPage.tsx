import React, { useEffect, useState } from "react";
import { departmentApi } from "../api/departmentApi";
import { Department } from "../types/department";
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

const DepartmentsPage: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [open, setOpen] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);

    const fetchDepartments = async () => {
        const res = await departmentApi.getAll();
        setDepartments(res.data);
    };

    const handleDelete = async (id: string) => {
        await departmentApi.delete(id);
        fetchDepartments();
    };

    const handleUpdateClick = (dep: Department) => {
        setCurrentDepartment(dep);
        setOpen(true);
    };

    const handleUpdateSave = async () => {
        if (currentDepartment && currentDepartment._id) {
            await departmentApi.update(currentDepartment._id, { name: currentDepartment.name });
            setOpen(false);
            fetchDepartments();
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Departments
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {departments.map((dep) => (
                        <TableRow key={dep._id}>
                            <TableCell>{dep.name}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleUpdateClick(dep)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleDelete(dep._id)}
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
                <DialogTitle>Update Department</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Department Name"
                        fullWidth
                        value={currentDepartment?.name || ""}
                        onChange={(e) =>
                            setCurrentDepartment({ ...currentDepartment!, name: e.target.value })
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

export default DepartmentsPage;
