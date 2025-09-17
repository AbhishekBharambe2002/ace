// api/employeeApi.ts
import axiosClient from "./axiosClient";
import { Employee } from "../types/employee";

export const employeeApi = {
    getAll: () => axiosClient.get("/employees"),
    getById: (id: string) => axiosClient.get(`/employees/${id}`),
    create: (data: Employee) => axiosClient.post("/employees", data),
    update: (id: string, data: Employee) => axiosClient.put(`/employees/${id}`, data),
    delete: (id: string) => axiosClient.delete(`/employees/${id}`),
};
