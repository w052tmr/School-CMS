import { Link } from "react-router-dom";
import { useState } from "react";

import "../auth.css";
import styles from "./Login.module.css";

import { useAuth } from "src/contexts/AuthContext";
import Button from "src/components/button/Button";
import Spinner from "src/components/spinner/Spinner";
import SuccessMsg from "src/components/successMsg/SuccessMsg";
import ErrorMsg from "src/components/error/Error";
import { login } from "src/services/api/login";
import { useMutation } from "@tanstack/react-query";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, authenticateUser } = useAuth();

    const mutation = useMutation({
        mutationFn: async (e) => {
            e.preventDefault();

            if (!email || !password) {
                throw new Error("You are missing your credentials.");
            }
            //backend authentication
            const data = await login(email, password);

            return data;
        },
        onError: () =>
            setTimeout(() => {
                mutation.reset();
            }, 4000),
        onSuccess: async (data) => {
            //frontend authentication
            await authenticateUser(data);
        },
    });

    return (
        <div>
            {mutation.isError && <ErrorMsg message={mutation.error.message} />}
            {mutation.isSuccess && user && (
                <SuccessMsg message={`Welcome back, ${user.firstName}! 👋`} />
            )}
            <form
                className={`auth ${styles.login}`}
                onSubmit={(e) => mutation.mutate(e)}
            >
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(String(e.target.value))}
                    />
                    <p className="invalid">Invalid email</p>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        minLength="8"
                        value={password}
                        onChange={(e) => setPassword(String(e.target.value))}
                    />
                    <p className="invalid">
                        Invalid password (8 character min)
                    </p>
                </div>
                <div className="auth-container">
                    {mutation.isPending ? (
                        <Spinner size={"small"} />
                    ) : (
                        <Button type={"auth"}>Login</Button>
                    )}
                    <Link to={"/signup"}>Don't have an account?</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
