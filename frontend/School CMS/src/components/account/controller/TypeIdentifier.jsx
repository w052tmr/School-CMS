import { useParams } from "react-router-dom";

import CreateAssignment from "./assignmentController/CreateAssignment";
import CreateCourse from "./courseController/CreateCourse";
import CreateUser from "./userController/CreateUser";

import UpdateAssignment from "./assignmentController/UpdateAssignment";
import UpdateCourse from "./courseController/UpdateCourse";
import UpdateUser from "./userController/UpdateUser";

import DeleteAssignment from "./assignmentController/DeleteAssignment";
import DeleteCourse from "./courseController/DeleteCourse";
import DeleteUser from "./userController/DeleteUser";

function TypeIdentifier() {
    const { type, action } = useParams();

    return (
        <>
            {/* teachers and students */}
            {(type === "students" || type === "teachers") &&
                action === "create" && <CreateUser />}

            {(type === "students" || type === "teachers") &&
                action === "update" && <UpdateUser />}

            {(type === "students" || type === "teachers") &&
                action === "delete" && <DeleteUser />}

            {/* courses */}
            {type === "courses" && action === "create" && <CreateCourse />}
            {type === "courses" && action === "update" && <UpdateCourse />}
            {type === "courses" && action === "delete" && <DeleteCourse />}

            {/* assignments */}
            {type === "assignments" && action === "create" && (
                <CreateAssignment />
            )}
            {type === "assignments" && action === "update" && (
                <UpdateAssignment />
            )}
            {type === "assignments" && action === "delete" && (
                <DeleteAssignment />
            )}
        </>
    );
}

export default TypeIdentifier;
