import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CartPage from "./pages/CartPage/CartPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import InvoicePage from "./pages/InvoicePage/InvoicePage";
import { CartProvider } from "./Context/CartContext";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage/InvoiceDetailPage";
import { SearchProvider } from "./Context/SearchContext";


function App() {


  return (
    <>
      <CartProvider>
        <SearchProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:details" element={<DetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/invoices" element={<InvoicePage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/invoice/:id" element={<InvoiceDetailPage />} />


          </Routes>
        </SearchProvider>
      </CartProvider>
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
