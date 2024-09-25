// styles
import NavBar from "../navBar/NavBar";
import styles from "./App.module.css";

// context

//routes
import AppRoutes from "src/routes/AppRoutes";

function App() {
    return (
        <div>
            <NavBar />
            <AppRoutes />
        </div>
    );
}

export default App;
