"use client";
import { Provider } from "react-redux";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";
import { store } from "@/store/store";

const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Box sx={{ overflow: "hidden", height: "100vh" }}>
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Sidebar />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              backgroundColor: "ButtonHighlight",
            }}
          >
            <Box sx={{ padding: "10px", width: "100%" }}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </Provider>
  );
};

export default WrapperLayout;
