export interface Employee {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    department: string;   // departmentId
    supervisor?: string;  // employeeId (self-reference)
    country: string;
    state: string;
    city: string;
}
