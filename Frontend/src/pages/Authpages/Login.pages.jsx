import { useState } from 'react';
import { Mail, Lock, Loader } from "lucide-react";
import './Login.css';
import { useAuth } from '../../Context/authContext.jsx'; // Correct hook

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // For showing loader or feedback on login attempt
    const [error, setError] = useState(null); // For handling errors

    const { login } = useAuth(); // Use `useAuth` instead of `useAuthStore`

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Clear previous errors

        try {
            // Assuming your API endpoint is /api/auth/login
            await login(username, password); // Make sure `login` expects username and password
            setLoading(false);
            // Handle successful login, e.g., redirect to a dashboard

        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="Logincontainer">
            <div className="formcontainer">
                <div className="left-div">
                    <h1>WELCOME</h1>
                </div>

                <div className="right-div">
                    <div className="logincontainer">
                        <h2>Login</h2>
                        <form className="login-form" onSubmit={handleLogin}>
                            <input
                                icon={Mail}
                                type='text'
                                name='username'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                icon={Lock}
                                type='password'
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button type="submit" disabled={loading}>
                                {loading ? <Loader /> : 'Login'}
                            </button>
                        </form>

                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
