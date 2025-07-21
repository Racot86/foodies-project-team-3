import React, {useState} from "react";
import {useAuthRedux} from "@/hooks";
import {Button} from "@/components/ui/Button";
import styles from "./TestAuth.module.css";

/**
 * TestAuth Component for testing authentication functionality
 * This component is used for testing purposes only and should not be used in production
 */
const TestAuth = () => {
    const {
        user,
        isAuthenticated,
        isSignUpLoading,
        isSignInLoading,
        isSignOutLoading,
        isGetCurrentUserLoading,
        error,
        register,
        login,
        logout,
        fetchCurrentUser,
        resetError,
    } = useAuthRedux();

    // Form state
    const [signUpForm, setSignUpForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [signInForm, setSignInForm] = useState({
        email: "",
        password: "",
    });

    // Form validation
    const isSignUpFormValid =
        signUpForm.name.trim() &&
        signUpForm.email.trim() &&
        signUpForm.password.trim() &&
        signUpForm.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[ -~]{6,64}$/);

    const isSignInFormValid =
        signInForm.email.trim() &&
        signInForm.password.trim();

    // Handle form changes
    const handleSignUpChange = (e) => {
        setSignUpForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (error) resetError();
    };

    const handleSignInChange = (e) => {
        setSignInForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (error) resetError();
    };

    // Handle form submissions
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await register(signUpForm);
            setSignUpForm({name: "", email: "", password: ""});
        } catch (err) {
            console.error("Sign up failed:", err);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await login(signInForm);
            setSignInForm({email: "", password: ""});
        } catch (err) {
            console.error("Sign in failed:", err);
        }
    };

    const handleSignOut = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Sign out failed:", err);
        }
    };

    const handleGetCurrentUser = async () => {
        try {
            await fetchCurrentUser();
        } catch (err) {
            console.error("Get current user failed:", err);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Authentication Testing</h1>

            {/* Status Display */}
            <div className={styles.statusContainer}>
                <h2>Authentication Status</h2>
                <p className={styles.statusDescription}>
                    Click the "Check Authentication Status" button below to verify if you're authenticated.
                    This will send a request to the <code>/api/users/current</code> endpoint.
                    If you receive user data, you're authenticated. If you receive a "Not authenticated" message, you're
                    not authenticated.
                </p>
                <div className={styles.statusItem}>
                    <span>Is Authenticated:</span>
                    <span className={isAuthenticated ? styles.success : styles.error}>
            {isAuthenticated ? "Yes" : "No"}
          </span>
                </div>
                <div className={styles.statusItem}>
                    <span>Sign Up Loading:</span>
                    <span>{isSignUpLoading ? "Yes" : "No"}</span>
                </div>
                <div className={styles.statusItem}>
                    <span>Sign In Loading:</span>
                    <span>{isSignInLoading ? "Yes" : "No"}</span>
                </div>
                <div className={styles.statusItem}>
                    <span>Sign Out Loading:</span>
                    <span>{isSignOutLoading ? "Yes" : "No"}</span>
                </div>
                <div className={styles.statusItem}>
                    <span>Check Auth Loading:</span>
                    <span>{isGetCurrentUserLoading ? "Yes" : "No"}</span>
                </div>
                {error && (
                    <div className={styles.statusItem}>
                        <span>Error:</span>
                        <span className={styles.error}>{error}</span>
                    </div>
                )}
            </div>

            {/* User Info Display */}
            {user && (
                <div className={styles.userContainer}>
                    <h2>User Information</h2>
                    <div className={styles.userInfo}>
                        <div className={styles.userItem}>
                            <span>Name:</span>
                            <span>{user.name}</span>
                        </div>
                        <div className={styles.userItem}>
                            <span>Email:</span>
                            <span>{user.email}</span>
                        </div>
                        {user.avatar && (
                            <div className={styles.userItem}>
                                <span>Avatar:</span>
                                <img
                                    src={user.avatar}
                                    alt={`${user.name}'s avatar`}
                                    className={styles.avatar}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className={styles.formsContainer}>
                {/* Sign Up Form */}
                <div className={styles.formContainer}>
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSignUp} className={styles.form}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={signUpForm.name}
                            onChange={handleSignUpChange}
                            className={styles.input}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signUpForm.email}
                            onChange={handleSignUpChange}
                            className={styles.input}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signUpForm.password}
                            onChange={handleSignUpChange}
                            className={styles.input}
                            required
                        />
                        <div className={styles.passwordRequirements}>
                            <p>Password must contain:</p>
                            <ul>
                                <li className={signUpForm.password.match(/[a-z]/) ? styles.valid : ""}>
                                    At least one lowercase letter
                                </li>
                                <li className={signUpForm.password.match(/[A-Z]/) ? styles.valid : ""}>
                                    At least one uppercase letter
                                </li>
                                <li className={signUpForm.password.match(/\d/) ? styles.valid : ""}>
                                    At least one number
                                </li>
                                <li className={signUpForm.password.match(/[^A-Za-z0-9]/) ? styles.valid : ""}>
                                    At least one special character
                                </li>
                                <li className={signUpForm.password.length >= 6 ? styles.valid : ""}>
                                    At least 6 characters long
                                </li>
                            </ul>
                        </div>
                        <Button
                            type="submit"
                            variant={Button.variants.PRIMARY}
                            disabled={!isSignUpFormValid || isSignUpLoading}
                            isLoading={isSignUpLoading}
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className={styles.formContainer}>
                    <h2>Sign In</h2>
                    <form onSubmit={handleSignIn} className={styles.form}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signInForm.email}
                            onChange={handleSignInChange}
                            className={styles.input}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signInForm.password}
                            onChange={handleSignInChange}
                            className={styles.input}
                            required
                        />
                        <Button
                            type="submit"
                            variant={Button.variants.PRIMARY}
                            disabled={!isSignInFormValid || isSignInLoading}
                            isLoading={isSignInLoading}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionsContainer}>
                <Button
                    onClick={handleSignOut}
                    variant={Button.variants.SECONDARY}
                    disabled={!isAuthenticated || isSignOutLoading}
                    isLoading={isSignOutLoading}
                >
                    Sign Out
                </Button>
                <Button
                    onClick={handleGetCurrentUser}
                    variant={Button.variants.SECONDARY}
                    disabled={isGetCurrentUserLoading}
                    isLoading={isGetCurrentUserLoading}
                >
                    Check Authentication Status
                </Button>
            </div>
        </div>
    );
};

export default TestAuth;
