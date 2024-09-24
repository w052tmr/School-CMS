import { Link } from "react-router-dom";

import "../auth.css";
import styles from "./signup.module.css";
import Button from "src/components/button/Button";

function Signup() {
    return (
        <form className={`auth ${styles.signup}`}>
            <h2>Signup</h2>
            <div>
                <label htmlFor="firstName">First Name: </label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="John"
                />
            </div>
            <div className="lastName">
                <label htmlFor="lastName">Last Name: </label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="email@example.com"
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
                />
                <p className="invalid">Invalid password (8 character min)</p>
            </div>
            <div className="passwordConfirm">
                <label htmlFor="passwordConfirm">Password Confirm: </label>
                <input
                    id="passwordConfirm"
                    type="password"
                    name="password"
                    className="passwordConfirm"
                    placeholder="Password"
                    minLength="8"
                />
            </div>
            <div>
                <label>Role: </label>
                <span>
                    <input
                        type="radio"
                        name="role"
                        id="student"
                        value="Student"
                    />
                    <label htmlFor="student">Student</label>
                </span>
                <span>
                    <input
                        type="radio"
                        name="role"
                        id="parent"
                        value="Parent"
                    />
                    <label htmlFor="parent">Parent</label>
                </span>
            </div>
            <div className="auth-container">
                <Button type={"auth"}>Signup</Button>
                <Link to={"/login"}>Already have an account?</Link>
            </div>
        </form>
    );
}

export default Signup;
