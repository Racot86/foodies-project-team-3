import React from "react";
import Modal from "@/components/modal/Modal";
import SignInForm from "@/components/signInForm/SignInForm";
import styles from "./SignInModal.module.css";
import { Heading, Text } from "@/components/ui";

const SignInModal = ({ onClose, onOpenSignUp }) => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <Heading level={1} size="lg" className={styles.heading}>
          Sign in
        </Heading>
        <SignInForm onClose={onClose} />
        <div className={styles.textRow}>
          <Text color="muted" size="sm" className={styles.question}>
            Don't have an account?
          </Text>
          <button
            type="button"
            className={styles.link}
            onClick={() => {
              onClose();
              if (onOpenSignUp) onOpenSignUp();
            }}
          >
            Create an account
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;
