import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "@routes/AppRoutes";

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};