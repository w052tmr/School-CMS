import { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { fetchCurrUser } from "src/services/api/fetchCurrUser";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // called at login and signup
    async function authenticateUser(user, location = "/courses") {
        setUser(user);
        setTimeout(() => {
            navigate(location);
        }, 1500);
    }

    // as long as user has a valid jwt, their data can be refetched anytime to keep them logged in (i.e., page reloads)
    async function fetchUser() {
        const user = await fetchCurrUser();
        setUser(user);
        return user;
    }

    function authRedirect() {
        return <Navigate to={"/login"} />;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                authenticateUser: async (data) => await authenticateUser(data),
                fetchCurrUser: async () => await fetchUser(),
                authRedirect: () => authRedirect(),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// custom hook for encapsulating all the above auth logic
function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
