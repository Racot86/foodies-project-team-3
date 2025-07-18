import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "@routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toastifyCustom.css";

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName="toastify__custom"
      />
    </BrowserRouter>
  );
};
