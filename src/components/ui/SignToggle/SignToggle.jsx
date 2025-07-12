// src/components/ui/SignToggle.jsx
import React, { useState } from "react";
import styles from "./SignToggle.module.css";
import SignInModal from "@/components/signInModal/SignInModal";
import SignUpModal from "@/components/signUpModal/SignUpModal";
import clsx from "clsx";

const SignToggle = () => {
  const [active, setActive] = useState("signin");
  const [modalOpen, setModalOpen] = useState(null); // null | 'signin' | 'signup'

  const handleClick = (type) => {
    setActive(type);
    setModalOpen(type);
  };

  const closeModal = () => {
    setModalOpen(null);
    setActive("signin");
  };

  const handleOpenSignUp = () => {
    setActive("signup");
    setModalOpen("signup");
  };

  const handleOpenSignIn = () => {
    setActive("signin");
    setModalOpen("signin");
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggleWrapper}>
        <div
          className={clsx(
            styles.toggleBackground,
            active === "signup" ? styles.right : styles.left
          )}
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

      {modalOpen === "signin" && (
        <SignInModal onClose={closeModal} onOpenSignUp={handleOpenSignUp} />
      )}
      {modalOpen === "signup" && (
        <SignUpModal onClose={closeModal} onOpenSignIn={handleOpenSignIn} />
      )}
    </div>
  );
};

export { SignToggle };
