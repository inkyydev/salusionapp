import { Outlet } from "react-router-dom";
import Navigation from "./navigation/Navigation";
import { Box } from "@mui/system";

export default function RootLayout() {
  return (
    <Box aria-label="fl-page">
      <Box>
        <Navigation />
      </Box>
      <Outlet />
    </Box>
  );
}
