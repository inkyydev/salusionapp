import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import theme from "./theme";

import Expenses from "./scenes/pages/expenses/Expenses";
import PlanDetails from "./scenes/pages/plan-details/PlanDetails";
import AddExpense from "./scenes/pages/expenses/AddExpense";
import Employees from "./scenes/pages/add-employees/Employees";
import MedicalExpenses from "./scenes/pages/medical-expenses/MedicalExpenses";

import RootLayout from "./scenes/RootLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Expenses /> },
      { path: "/plan-details", element: <PlanDetails /> },
      { path: "/add-expense", element: <AddExpense /> },
      { path: "/employees", element: <Employees /> },
      { path: "/medical-expenses", element: <MedicalExpenses /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
