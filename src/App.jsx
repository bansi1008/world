import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Pagenotfound from "./pages/Pagenotfound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import ContryList from "./components/ContryList";
import City from "./components/City";
import Form from "./components/Form";
import { CityProvider } from "./contexts/Citycontext";
import { AuthProvider } from "./contexts/Fakecontext";
import Protected from "./pages/Protected";

function App() {
  return (
    <div>
      <AuthProvider>
        <CityProvider>
          <BrowserRouter>
            <Routes>
              <Route path="product" element={<Product />} />
              <Route index element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <Protected>
                    <AppLayout />{" "}
                  </Protected>
                }
              />
              <Route path="*" element={<Pagenotfound />} />
              <Route path="app/*" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />

                <Route path="countries" element={<ContryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </CityProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
