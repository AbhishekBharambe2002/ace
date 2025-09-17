import React from "react";
import EmployeeForm from "../components/EmployeeForm";

const EmployeeCreate: React.FC = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>Create Employee</h2>
            <EmployeeForm onSuccess={() => alert("Employee created!")} />
        </div>
    );
};

export default EmployeeCreate;
