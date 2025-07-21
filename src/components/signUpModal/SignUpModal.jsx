import React from "react";
import Modal from "@/components/modal/Modal";
import SignUpForm from "@/components/signUpForm/SignUpForm";
import styles from "./SignUpModal.module.css";
import {Heading, Text} from "@/components/ui";

const SignUpModal = ({onClose, onOpenSignIn}) => {
    return (
        <Modal onClose={onClose}>
            <div className={styles.content}>
                <Heading level={1} size="lg" className={styles.heading}>
                    Sign Up
                </Heading>
                <SignUpForm onClose={onClose}/>
                <div className={styles.textRow}>
                    <Text color="muted" size="sm" className={styles.question}>
                        I already have an account?
                    </Text>
                    <button
                        type="button"
                        className={styles.link}
                        onClick={() => {
                            onClose();
                            if (onOpenSignIn) onOpenSignIn();
                        }}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default SignUpModal;
