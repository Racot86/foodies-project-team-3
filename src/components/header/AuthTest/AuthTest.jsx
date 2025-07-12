import React, { useState } from "react";
import { useAuthRedux } from "@/hooks";
import styles from "./AuthTest.module.css";
import AuthTestModal from "./AuthTestModal/AuthTestModal";

/**
 * AuthTest Component for testing authentication in the header
 * This component displays user info and auth buttons based on authentication status
 * It can be easily commented out as it's a self-contained component
 */
const AuthTest = () => {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuthRedux();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("signin");

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {isAuthenticated && user ? (
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user.avatar ? (
              <img src={user.avatar} alt={`${user.name}'s avatar`} />
            ) : (
              <div className={styles.defaultAvatar}>
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>
          <span className={styles.userName}>{user.name}</span>
          <button
            className={styles.logoutButton}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <button
            className={styles.authButton}
            onClick={() => openModal("signin")}
          >
            Sign In
          </button>
          <button
            className={styles.authButton}
            onClick={() => openModal("signup")}
          >
            Sign Up
          </button>
        </div>
      )}

      {modalOpen && (
        <AuthTestModal
          onClose={closeModal}
          initialType={modalType}
        />
      )}
    </div>
  );
};

export default AuthTest;
