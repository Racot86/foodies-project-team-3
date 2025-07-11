// src/components/ui/SignToggle.jsx
import React, { useState } from "react";
import styles from "./SignToggle.module.css";
import SignInSignUpModal from "@/components/signInSignUpModal/SignInSignUpModal";
import clsx from "clsx";

const SignToggle = () => {
  const [active, setActive] = useState("signin");
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = (type) => {
    setActive(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActive("signin");
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggleWrapper}>
        <div
          className={`${styles.toggleBackground} ${
            active === "signup" ? styles.right : styles.left
          }`}
        />
        <button
          className={clsx(
            styles.button,
            active === "signin" && styles.activeText
          )}
          onClick={() => handleClick("signin")}
        >
          Sign in
        </button>
        <button
          className={clsx(
            styles.button,
            active === "signup" && styles.activeText
          )}
          onClick={() => handleClick("signup")}
        >
          Sign up
        </button>
      </div>

      {modalOpen && (
        <SignInSignUpModal onClose={closeModal} initialType={active} />
      )}
    </div>
  );
};

export { SignToggle };
