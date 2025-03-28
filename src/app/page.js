'use client'
import styles from './login.module.css';
import React, {useEffect, useRef, useState} from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const errorRef = useRef(null);

    // In real projects most of the time external libraries such
    // as Formik and zod are used for form submissions and validations

    // As this project is a simple one, I have not used typescript

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return re.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long and contain number, both uppercase and lowercase letters');
            return;
        }

        setLoading(true);

        try {
            // Mocking network error
            //await new Promise((resolve, reject) => setTimeout(() => reject(new Error('Mock error')), 1000));
            // Mocking network request
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSuccess(true);
        } catch (err) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (error) {
            errorRef.current.focus();
        }
    }, [error]);

    // Copied logo and favicon from https://evilmartians.com/ to make the page more relevant

    return (
        <>
            <div className={styles.logo}>
                <img src="/logo.svg" alt="Logo" />
            </div>
            {success ? (
                <div className={styles.successMessage}>
                    <img src="/success.svg" alt="Success" />
                    <span>Login successful!</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.loginForm} aria-live="assertive">
                    <div>
                        <span className={styles.loginText}>Sign In</span>
                        {error && (
                            <div className={styles.errorMessage} role="alert" ref={errorRef} tabIndex="-1">
                                {error}
                            </div>
                        )}
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            )}
        </>
    );
};

export default Login;