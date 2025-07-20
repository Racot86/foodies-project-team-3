import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import icons from "../../assets/icons/icons.svg";
import PageTransitionWrapper from "@components/pageTransitionWrapper/PageTransitionWrapper.jsx";

const Modal = ({ onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);

    // Set a small delay before showing the modal to ensure the CSS transition works
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      clearTimeout(timer);
    };
  }, [onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`${styles.overlay} ${isVisible ? styles.overlayVisible : ''}`}
      onClick={handleBackdrop}
    >
      <div
        className={`${styles.modal} ${isVisible ? styles.modalVisible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <svg className={styles.closeIcon} width="24" height="24">
            <use href={`${icons}#icon-x`} />
          </svg>
        </button>
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </div>
    </div>
  );
};

export default Modal;
