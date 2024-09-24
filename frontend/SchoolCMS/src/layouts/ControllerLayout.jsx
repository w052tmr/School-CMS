import { useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// styles
import styles from "./ControllerLayout.module.css";

// context
import { useAuth } from "src/contexts/AuthContext";

// functions
import { submitControllerForm } from "src/services/api/submitControllerForm";

// components
import NavBarController from "src/components/account/controller/navBarController/NavBarController";
import ActionBar from "src/components/account/controller/actionBar/ActionBar";
import Spinner from "src/components/spinner/Spinner";
import SuccessMsg from "src/components/successMsg/SuccessMsg";
import Error from "src/components/error/Error";

function ControllerLayout() {
    const { user } = useAuth();
    const { type, action } = useParams();
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (obj) => {
            const { formData, type, action } = obj;
            return await submitControllerForm(type, action, formData);
        },

        onMutate: async ({ formData }) => {
            await queryClient.cancelQueries({ queryKey: ["courses"] });

            if (type === "courses" && action === "delete") {
                const ids = formData.ids;

                queryClient.setQueryData(["courses", user.school], (old) => {
                    old.filter((course) => {
                        !ids.includes(course.id);
                    });
                });
            }
        },

        onSuccess: async () => {
            if (type === "courses") {
                await queryClient.refetchQueries({
                    queryKey: ["courses"],
                });
            }

            const toBeDeleted = `${action}${type.substring(
                0,
                type.length - 1
            )}`.toLowerCase();

            const storageToRemove = { ...localStorage };
            Object.keys(storageToRemove).forEach((key) => {
                if (key.toLowerCase().startsWith(toBeDeleted)) {
                    localStorage.removeItem(key);
                }
            });

            setTimeout(() => {
                mutation.reset();

                navigate("/courses");
            }, 2000);
        },

        onError: () => {
            setTimeout(() => {
                mutation.reset();
            }, 4000);
        },

        // Always refetch after error or success:
        onSettled: async () => {
            if (type === "courses") {
                await queryClient.invalidateQueries({
                    queryKey: ["courses"],
                });
            }
        },
    });

    const handleControllerForm = (e, formData, type, action) => {
        e.preventDefault();
        mutation.mutate({ formData, type, action });
    };

    console.log(formData);

    return (
        <>
            {mutation.isSuccess && (
                <SuccessMsg
                    message={`${type
                        .toUpperCase()
                        .substring(
                            0,
                            type.length - 1
                        )} ${action.toUpperCase()}D successfully! 👍 `}
                />
            )}
            {mutation.isError && (
                <Error message={`${mutation.error.message} 💣`} />
            )}
            {user && user.role !== "student" && (
                <form
                    className={styles.controller}
                    onSubmit={(e) =>
                        handleControllerForm(e, formData, type, action, user)
                    }
                >
                    <NavBarController />
                    <>
                        {mutation.isPending ? (
                            <Spinner />
                        ) : (
                            <Outlet context={setFormData} />
                        )}
                    </>
                    <ActionBar />
                    <button type="submit" className={styles.submitButton}>
                        {action} {type}
                    </button>
                </form>
            )}
        </>
    );
}

export default ControllerLayout;
