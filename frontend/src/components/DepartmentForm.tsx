import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";

interface Props {
    onSuccess?: () => void;
}

const DepartmentSchema = Yup.object().shape({
    name: Yup.string().required("Department name is required"),
});

const DepartmentForm: React.FC<Props> = ({ onSuccess }) => {
    return (
        <Formik
            initialValues={{
                name: "",
            }}
            validationSchema={DepartmentSchema}
            onSubmit={async (values, { resetForm }) => {
                try {
                    await axios.post(
                        `${process.env.REACT_APP_API_BASE_URL}/api/v1/departments`,
                        values
                    );
                    resetForm();
                    onSuccess?.();
                } catch (error) {
                    console.error("Error creating department:", error);
                }
            }}
        >
            {({ errors, touched, handleChange }) => (
                <Form>
                    <Box display="flex" flexDirection="column" gap={3} maxWidth="600px">
                        <TextField
                            name="name"
                            label="Department Name"
                            fullWidth
                            onChange={handleChange}
                            error={!!errors.name && touched.name}
                            helperText={touched.name && errors.name}
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Save Department
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default DepartmentForm;
