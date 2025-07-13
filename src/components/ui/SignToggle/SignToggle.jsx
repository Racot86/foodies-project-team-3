import React, { useReducer } from "react";
import styles from "./SignToggle.module.css";
import SignInModal from "@/components/signInModal/SignInModal";
import SignUpModal from "@/components/signUpModal/SignUpModal";
import clsx from "clsx";

import {
  modalReducer,
  initialModalState as initialState,
  OPEN_SIGNIN,
  OPEN_SIGNUP,
  CLOSE,
} from "@/reducers/singInSignUpModalReducer";

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
