import { useState, useEffect } from 'react';
import { Mail, Lock, Loader } from "lucide-react";
import './Login.css';
import { useAuth } from '../../Context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import HimlayanLogo from '../../assets/HIMLAYANG_LAHIN_KAYUMANGGI.png';
export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [cooldown, setCooldown] = useState(false);
    const [cooldownTimer, setCooldownTimer] = useState(30); // Start with a 30-second timer
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (cooldown) return; // Prevent login if in cooldown period

        setLoading(true);
        try {
            await login(username, password);
            setLoading(false);
            setAttempts(0); // Reset attempts on successful login
        } catch (err) {
            console.log(err);
            setLoading(false);
            setAttempts((prev) => prev + 1);
        }
    };

    useEffect(() => {
        // If attempts reach 3, activate cooldown
        if (attempts >= 3) {
            setCooldown(true);
            setCooldownTimer(30); // Reset cooldown timer to 30 seconds
            setAttempts(0); // Reset attempts after triggering cooldown
        }
    }, [attempts]);

    useEffect(() => {
        let timer;
        if (cooldown) {
            // Start countdown if cooldown is active
            timer = setInterval(() => {
                setCooldownTimer((prev) => prev - 1);
            }, 1000);
        }
        // Clear timer and end cooldown when time runs out
        if (cooldownTimer === 0) {
            clearInterval(timer);
            setCooldown(false);
        }
        return () => clearInterval(timer); // Cleanup timer on component unmount
    }, [cooldown, cooldownTimer]);

    const handleContinueWithoutLogin = () => {
        navigate('/visitor');
    };

    return (
        <div className="Logincontainer">
            <div className="formcontainer">
                <div className="left-div">
                    <img className="login-page-himlayanImg" src={HimlayanLogo} alt="alter"/>
                </div>

                <div className="right-div">
                    <div className="logincontainer">
                        <h2 className='h2-login'>Login</h2>
                        <form className="login-form" onSubmit={handleLogin}>
                            <div className="login-input-container">
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
                            </div>
                            {error && <p className="error-text-login">{error}</p>}

                            <button className="login-button" type="submit" disabled={loading || cooldown}>
                                {loading ? <Loader /> : 'Login'}
                            </button>
                        </form>

                        {cooldown && (
                            // <p className="lockout-message">
                            //     Too many failed attempts.
                            // </p>,
                            <p className="lockout-message">
                                Please wait <span className="lockout-countdown">{cooldownTimer}</span> seconds before trying again.
                            </p>
                        )}

                        <p className="continue-text" onClick={handleContinueWithoutLogin}>
                            Continue Without Login
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
