import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "@routes/AppRoutes";

export const App = () => {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Foodies Project</h1>
        <p>Welcome to the Foodies Recipe Application!</p>
      </div>
      <AppRoutes />
    </BrowserRouter>
  );
};