import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "src/contexts/AuthContext";

import Spinner from "src/components/spinner/Spinner";
import PageNotFound from "src/components/pageNotFound/PageNotFound";

import Main from "src/components/main/Main";
import NavMenu from "src/components/navMenu/NavMenu";
import Account from "src/components/account/Account";
import About from "src/components/account/about/About";
import ControllerRoutes from "./ControllerRoutes";

import { useQuery } from "@tanstack/react-query";

function ProtectedRoutes() {
    const { user, fetchCurrUser, authRedirect } = useAuth();

    let isLoading = false;
    let error = null;
    let isSuccess = true;
    if (!user) {
        ({ isLoading, error, isSuccess } = useQuery({
            queryKey: ["user", "me"],
            queryFn: async () => {
                return await fetchCurrUser();
            },
        }));
    }
    return (
        <>
            {isLoading && (
                <div style={{ height: "100vh", width: "auto" }}>
                    <Spinner />
                </div>
            )}
            {error && authRedirect()}
            {isSuccess && (
                <Routes>
                    {/* private */}
                    <Route path="/" element={<Navigate to={"/courses"} />} />
                    <Route
                        path="/courses"
                        element={<Main type={"courses"} />}
                    />
                    <Route
                        path="/courses/:id"
                        element={<Main type={"course"} />}
                    />
                    <Route
                        path="/student/:id/assignments"
                        element={<Main type={"student"} />}
                    />

                    <Route path="/me" element={<Account />}>
                        <Route index element={<About />} />
                        <Route path="about" element={<About />} />
                        <Route path="*" element={<ControllerRoutes />} />
                    </Route>

                    <Route path="/user/:id" element={<Account />}>
                        <Route path="about" element={<About />} />
                    </Route>

                    <Route path="/menu" element={<NavMenu />} />

                    {/* NOT FOUND */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            )}
        </>
    );
    // return <>{user ? <Outlet /> : <Navigate to={"/login"} />}</>;
}

export default ProtectedRoutes;
