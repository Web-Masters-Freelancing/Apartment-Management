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

        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            width: "100%",
            height: "90%",
          }}
        >
          <Sidebar />
          <Box
            sx={{
              display: "flex",
              width: "88%",
              backgroundColor: "ButtonHighlight",
            }}
          >
            <Box
              sx={{
                padding: "10px",
                width: "100%",
                height: "98%",
                overflowY: "auto",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </Provider>
  );
};

export default WrapperLayout;
