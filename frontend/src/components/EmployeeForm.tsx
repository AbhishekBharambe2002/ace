import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, TextField, MenuItem, Box } from "@mui/material";
import axios from "axios";
import { employeeApi } from "../api/employeeApi";

interface Props {
    onSuccess?: () => void;
}

const EmployeeSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    jobTitle: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
});

const EmployeeForm: React.FC<Props> = ({ onSuccess }) => {
    const [departments, setDepartments] = useState<{ _id: string; name: string }[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        // Load departments using env variable
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/departments`)
            .then((res) => setDepartments(res.data));

        // Load countries
        axios.get("https://countriesnow.space/api/v0.1/countries/positions").then((res) => {
            setCountries(res.data.data.map((c: any) => c.name));
        });
    }, []);

    const handleCountryChange = (country: string) => {
        setSelectedCountry(country);
        axios
            .post("https://countriesnow.space/api/v0.1/countries/states", { country })
            .then((res) => setStates(res.data.data.states.map((s: any) => s.name)));
    };

    const handleStateChange = (state: string) => {
        axios
            .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
                country: selectedCountry,
                state,
            })
            .then((res) => setCities(res.data.data));
    };

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                jobTitle: "",
                department: "",
                supervisor: undefined,
                country: "",
                state: "",
                city: "",
            }}
            validationSchema={EmployeeSchema}
            onSubmit={async (values, { resetForm }) => {
                const payload = { ...values };
                if (!payload.supervisor) delete payload.supervisor; // don't send empty value
                await employeeApi.create(payload);
                resetForm();
                onSuccess?.();
            }}
        >
            {({ errors, touched, handleChange }) => (
                <Form>
                    <Box display="flex" flexDirection="column" gap={3} maxWidth="600px">
                        {/* First Name */}
                        <TextField
                            name="firstName"
                            label="First Name"
                            fullWidth
                            onChange={handleChange}
                            error={!!errors.firstName && touched.firstName}
                            helperText={touched.firstName && errors.firstName}
                        />

                        {/* Last Name */}
                        <TextField
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            onChange={handleChange}
                            error={!!errors.lastName && touched.lastName}
                            helperText={touched.lastName && errors.lastName}
                        />

                        {/* Email */}
                        <TextField
                            name="email"
                            label="Email Address"
                            fullWidth
                            onChange={handleChange}
                            error={!!errors.email && touched.email}
                            helperText={touched.email && errors.email}
                        />

                        {/* Job Title */}
                        <TextField
                            name="jobTitle"
                            label="Job Title"
                            fullWidth
                            onChange={handleChange}
                            error={!!errors.jobTitle && touched.jobTitle}
                            helperText={touched.jobTitle && errors.jobTitle}
                        />

                        {/* Department */}
                        <TextField select name="department" label="Department" fullWidth onChange={handleChange}>
                            {departments.map((dep) => (
                                <MenuItem key={dep._id} value={dep._id}>
                                    {dep.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Country */}
                        <TextField
                            select
                            name="country"
                            label="Country"
                            fullWidth
                            onChange={(e) => {
                                handleChange(e);
                                handleCountryChange(e.target.value);
                            }}
                        >
                            {countries.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* State */}
                        <TextField
                            select
                            name="state"
                            label="State"
                            fullWidth
                            onChange={(e) => {
                                handleChange(e);
                                handleStateChange(e.target.value);
                            }}
                        >
                            {states.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {s}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* City */}
                        <TextField select name="city" label="City" fullWidth onChange={handleChange}>
                            {cities.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Submit */}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Save Employee
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default EmployeeForm;
