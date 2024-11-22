import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/SignIn.css";

const SignIn = ({ onSignIn }) => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState(null); // State for handling errors
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error before making the request

        try {
            const response = await fetch(import.meta.env.VITE_API_API_BASE_URL_SIGNIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error("Invalid username or password");
            }

            const data = await response.json();
            
            // Mock behavior to simulate successful sign-in
            alert("Sign-In Successful");
            onSignIn(); // Update the authentication state in App
            navigate("/admin/services"); // Redirect to /services
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h1>Sign In</h1>
                {error && <p className="error-message">{error}</p>} {/* Display errors */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
