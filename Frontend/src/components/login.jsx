import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://todo-backend-1-t6bd.onrender.com";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!email.trim() || !password.trim()) {
            setMessage("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log("Login response:", data);

            if (!response.ok) {
                setMessage(
                    data.message || "Invalid email or password"
                );
                return;
            }

            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            setMessage("Login successful!");

            setTimeout(() => {
                navigate("/todo");
            }, 500);

        } catch (error) {
            console.error("Login error:", error);

            setMessage(
                "Unable to connect to server"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            <div className="login-box">

                <h1>Welcome Back</h1>

                <p>Login to manage your tasks</p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label htmlFor="email">
                            EMAIL
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            PASSWORD
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "LOGGING IN..."
                            : "LOGIN"}
                    </button>

                </form>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}

                <p>
                    Don't have an account?{" "}
                    <a href="#/register">
                        Register
                    </a>
                </p>

            </div>

        </div>
    );
}

export default Login;