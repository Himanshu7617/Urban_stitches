import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { ClerkProvider, SignedIn } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard.tsx";
import Home from "./features/home/Home.tsx";
import Admin from "./features/admin/Admin.tsx";
import Product from "./features/products/Product.tsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route
              path="/home"
              element={
                <SignedIn>
                  <Home />
                </SignedIn>
              }
            ></Route>
            <Route
              path="/adminPortal"
              element={
                <SignedIn>
                  <Admin />
                </SignedIn>
              }
            ></Route>
            <Route
            path="/product/:id"
            element = {
              <SignedIn>
                <Product/>
              </SignedIn>
            }
            >

            </Route>
            <Route
            path="/app"
            element = {
              <SignedIn>
                <App/>
              </SignedIn>
            }
            >

            </Route>
          </Routes>
        </Router>
      </ClerkProvider>
    </Provider>
  </StrictMode>
);
