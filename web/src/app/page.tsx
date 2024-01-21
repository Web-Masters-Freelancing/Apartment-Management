"use client";
import { store } from "../store/store";
import Snackbar from "./components/Snackbar";
import LoginPage from "./login/page";
import { Provider } from "react-redux";

const Home = () => {
  return (
    <Provider store={store}>
      <Snackbar />
      <LoginPage />
    </Provider>
  );
};

export default Home;
