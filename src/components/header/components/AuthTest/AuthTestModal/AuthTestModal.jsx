import React, { useState } from "react";
import { useAuthRedux } from "@/hooks/index.js";
import { Button } from "@components/ui/Button/index.js";
import Modal from "@components/modal/Modal.jsx";
import styles from "./AuthTestModal.module.css";

/**
 * AuthTestModal Component for sign-in and sign-up functionality
 * This component is part of the AuthTest component and will be removed when AuthTest is removed
 */
const AuthTestModal = ({ onClose, initialType = "signin" }) => {
  const {
    register,
    login,
    isSignUpLoading,
    isSignInLoading,
    error,
    resetError,
  } = useAuthRedux();

  const [active, setActive] = useState(initialType);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const isValid =
    active === "signin"
      ? form.email.trim() && form.password.trim()
      : form.name.trim() && form.email.trim() && form.password.trim();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) resetError();
  };

  const handleSwitch = (type) => {
    setActive(type);
    setForm({ name: "", email: "", password: "" });
    if (error) resetError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (active === "signin") {
        await login({ email: form.email, password: form.password });
      } else {
        await register({ name: form.name, email: form.email, password: form.password });
      }
      onClose();
    } catch (err) {
      console.error("Authentication failed:", err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <h2 className={styles.title}>{active === "signin" ? "Sign In" : "Sign Up"}</h2>

        {error && <div className={styles.error}>{error}</div>}

        {active === "signup" && (
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant={Button.variants.SECONDARY}
          className={styles.submitBtn}
          disabled={!isValid || (active === "signin" ? isSignInLoading : isSignUpLoading)}
          isLoading={active === "signin" ? isSignInLoading : isSignUpLoading}
        >
          {active === "signin" ? "Sign In" : "Create Account"}
        </Button>
        <div className={styles.switchOption}>
          {active === "signin" ? (
            <span>
              Don't have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSwitch("signup");
                }}
              >
                Sign up
              </a>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSwitch("signin");
                }}
              >
                Sign in
              </a>
            </span>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AuthTestModal;
