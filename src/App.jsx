import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AccountConfirmation from "./pages/AccountConfirmation";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Favorites from "./pages/Favorites";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";

import { ResultsProvider } from "./context/ResultsProvider";
import { AuthProvider } from "./context/AuthProvider";
import { FavoritesProvider } from "./context/FavoritesProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <ResultsProvider>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/openid" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="sign-up" element={<Signup />} />
                <Route path="confirm/:token" element={<AccountConfirmation />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="forgot-password/:token" element={<NewPassword />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route path="favorites" index element={<Favorites />} />
                <Route path="profile" element={<EditProfile />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
            </Routes>
          </ResultsProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;