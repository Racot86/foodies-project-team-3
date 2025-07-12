// src/components/ui/SignToggle.jsx
import React, { useReducer } from "react";
import styles from "./SignToggle.module.css";
import SignInModal from "@/components/signInModal/SignInModal";
import SignUpModal from "@/components/signUpModal/SignUpModal";
import clsx from "clsx";

const initialState = {
  active: "signin", // 'signin' | 'signup'
  modalOpen: null, // null | 'signin' | 'signup'
};

const OPEN_SIGNIN = "OPEN_SIGNIN";
const OPEN_SIGNUP = "OPEN_SIGNUP";
const CLOSE = "CLOSE";

function modalReducer(state, action) {
  switch (action.type) {
    case OPEN_SIGNIN:
      return { active: "signin", modalOpen: "signin" };
    case OPEN_SIGNUP:
      return { active: "signup", modalOpen: "signup" };
    case CLOSE:
      return { active: "signin", modalOpen: null };
    default:
      return state;
  }
}

const SignToggle = () => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const handleClick = (type) => {
    dispatch({ type: type === "signin" ? OPEN_SIGNIN : OPEN_SIGNUP });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE });
  };

  const handleOpenSignUp = () => {
    dispatch({ type: OPEN_SIGNUP });
  };

  const handleOpenSignIn = () => {
    dispatch({ type: OPEN_SIGNIN });
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggleWrapper}>
        <div
          className={clsx(
            styles.toggleBackground,
            state.active === "signup" ? styles.right : styles.left
          )}
        />
        <button
          className={clsx(
            styles.button,
            state.active === "signin" && styles.activeText
          )}
          onClick={() => handleClick("signin")}
        >
          Sign in
        </button>
        <button
          className={clsx(
            styles.button,
            state.active === "signup" && styles.activeText
          )}
          onClick={() => handleClick("signup")}
        >
          Sign up
        </button>
      </div>

      {state.modalOpen === "signin" && (
        <SignInModal onClose={closeModal} onOpenSignUp={handleOpenSignUp} />
      )}
      {state.modalOpen === "signup" && (
        <SignUpModal onClose={closeModal} onOpenSignIn={handleOpenSignIn} />
      )}
    </div>
  );
};

export { SignToggle };
