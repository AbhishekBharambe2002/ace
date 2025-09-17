import axiosClient from "./axiosClient";
import { Department } from "../types/department";

export const departmentApi = {
    getAll: () => axiosClient.get<Department[]>("/departments"),
    getById: (id: string) => axiosClient.get<Department>(`/departments/${id}`),
    update: (id: string, data: Partial<Department>) =>
        axiosClient.put(`/departments/${id}`, data),
    delete: (id: string) => axiosClient.delete(`/departments/${id}`),
};
