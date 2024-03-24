import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
       
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#F6FFF9",
              border: "1px solid #48C1B5",
              color: "black",
              padding: "12px 24px",
              textAlign: "center",
            },
            icon: false,
          },
          error: {
            style: {
              border: "1px solid #CF3636",
              color: "#CF3636",
              padding: "12px 24px",
              textAlign: "center",
            },
            icon: false,
          },
        }}
      />
    </>
  );
}

export default App;
