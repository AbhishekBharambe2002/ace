import React from "react";
import DepartmentForm from "../components/DepartmentForm";

const DepartmentCreate: React.FC = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>Create Department</h2>
            <DepartmentForm onSuccess={() => alert("Department created!")} />
        </div>
    );
};

export default DepartmentCreate;
