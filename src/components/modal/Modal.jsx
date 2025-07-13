import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import icons from "../../assets/icons/icons.svg";

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleBackdrop}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
        {children}
      </div>
    </div>
  );
};

export default Modal;
