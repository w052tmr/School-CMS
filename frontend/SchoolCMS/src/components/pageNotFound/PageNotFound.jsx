import { Navigate } from "react-router-dom";
import styles from "./PageNotFound.module.css";
import { useAuth } from "src/contexts/AuthContext";

function PageNotFound({ user }) {
    if (!user) {
        setTimeout(() => {
            return <Navigate to={"/login"} />;
        }, 1500);
    }

    return <div>Sorry couldn't find that one :(</div>;
}

export default PageNotFound;
