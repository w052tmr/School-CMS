import { Route, Routes } from "react-router-dom";
import ControllerLayout from "src/layouts/ControllerLayout";
import TypeIdentifier from "src/components/account/controller/TypeIdentifier";

function ControllerRoutes() {
    return (
        <Routes>
            <Route path="controller" element={<ControllerLayout />}>
                <Route path=":type/:action" element={<TypeIdentifier />} />
            </Route>
        </Routes>
    );
}

export default ControllerRoutes;
