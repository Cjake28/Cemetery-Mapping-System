import { useState } from 'react';
import { Mail, Lock, Loader } from "lucide-react";
import './Login.css';
import { useAuth } from '../../Context/authContext.jsx'; // Correct hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // For showing loader or feedback on login attempt
    const { login, error } = useAuth(); // Use `useAuth` instead of `useAuthStore`
    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(username, password);
            setLoading(false);
            // Handle successful login, e.g., redirect to a dashboard

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleContinueWithoutLogin = () => {
        navigate('/visitor'); // Navigate to /visitor when the button is clicked
    };

    return (
        <div className="Logincontainer">
            <div className="formcontainer">
                <div className="left-div">
                    <h1 className="h1-login">WELCOME</h1>
                </div>

                <div className="right-div">
                    <div className="logincontainer">
                        <h2 className='h2-login'>Login</h2>
                        <form className="login-form" onSubmit={handleLogin}>
                            <input
                                className='Input-login'
                                icon={Mail}
                                type='text'
                                name='username'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                            />

                            <input
                                className='Input-login'
                                icon={Lock}
                                type='password'
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                            />

                            {error && <p className="error-text-login">{error}</p>}

                            <button className="login-button" type="submit" disabled={loading}>
                                {loading ? <Loader /> : 'Login'}
                            </button>
                        </form>


                        {/* Continue without login button */}
                        {/* <button className="continue-button" onClick={handleContinueWithoutLogin}>
                            Continue Without Login
                        </button> */}
                        
                        {/* Alternatively, you can use a text link */}
                        <p className="continue-text" onClick={handleContinueWithoutLogin}>
                            Continue Without Login
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
