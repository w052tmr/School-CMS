import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProtectedRoutes from "src/routes/ProtectedRoutes";

// context
import { useAuth } from "src/contexts/AuthContext";

// components
import Login from "src/components/auth/login/Login";
import Signup from "src/components/auth/signup/Signup";

function AppRoutes() {
    return (
        <Routes>
            {/* public */}
            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<ProtectedRoutes />} />
        </Routes>
    );
}

export default AppRoutes;
