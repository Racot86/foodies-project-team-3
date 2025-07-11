import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Modal from "../modal/Modal";
import styles from "./SignInSignUpModal.module.css";

const SignInSignUpModal = ({ onClose, initialType = "signin" }) => {
  const [active, setActive] = useState(initialType);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const isValid =
    active === "signin"
      ? form.email.trim() && form.password.trim()
      : form.name.trim() && form.email.trim() && form.password.trim();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSwitch = (type) => {
    setActive(type);
    setForm({ name: "", email: "", password: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
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
          disabled={!isValid}
          href={undefined}
          to={undefined}
          isLoading={false}
          onClick={() => {}}
        >
          {active === "signin" ? "sign in" : "create"}
        </Button>
        <div className={styles.switchOption}>
          {active === "signin" ? (
            <span>
              Don’t have an account?{" "}
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

export default SignInSignUpModal;
