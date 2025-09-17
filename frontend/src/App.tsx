import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

// Department
import DepartmentsPage from "./pages/DepartmentsPage";
import DepartmentCreate from "./pages/DepartmentCreate";

// Employee
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeCreate from "./pages/EmployeeCreate";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Box
          component="nav"
          display="flex"
          justifyContent="center"
          gap={2}
          p={2}
          bgcolor="#f5f5f5"
        >
          <Button
            component={Link}
            to="/departments"
            variant="contained"
            color="primary"
          >
            Departments
          </Button>
          <Button
            component={Link}
            to="/employees"
            variant="contained"
            color="secondary"
          >
            Employees
          </Button>
        </Box>

        <Routes>
          <Route
            path="/departments"
            element={
              <div style={{ padding: "1rem" }}>
                <DepartmentCreate />
                <DepartmentsPage />
              </div>
            }
          />

          <Route
            path="/employees"
            element={
              <div style={{ padding: "1rem" }}>
                <EmployeeCreate />
                <EmployeesPage />
              </div>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
