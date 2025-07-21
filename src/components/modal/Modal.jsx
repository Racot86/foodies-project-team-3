import React, {useCallback, useEffect, useState} from "react";
import styles from "./Modal.module.css";
import icons from "../../assets/icons/icons.svg";
import PageTransitionWrapper from "@components/pageTransitionWrapper/PageTransitionWrapper.jsx";
import {useAppDispatch} from "@/redux/store";
import {blockScroll, unblockScroll} from "@/redux/slices/scrollControlSlice";

const Modal = ({onClose, children}) => {
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useAppDispatch();

    const handleClose = useCallback(() => {
        // First set isVisible to false to trigger the CSS transition
        setIsVisible(false);

        // Delay actual closing to allow the transition to complete
        setTimeout(() => {
            onClose();
        }, 500); // Match the CSS transition duration
    }, [onClose]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") handleClose();
        };
        document.addEventListener("keydown", handleEsc);

        // Block scrolling when modal opens
        dispatch(blockScroll('modal'));

        // Set a small delay before showing the modal to ensure the CSS transition works
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 50);

        return () => {
            document.removeEventListener("keydown", handleEsc);
            clearTimeout(timer);

            // Unblock scrolling when modal closes
            dispatch(unblockScroll());
        };
    }, [handleClose, dispatch]);

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) handleClose();
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
                    onClick={handleClose}
                    aria-label="Close modal"
                    type="button"
                >
                    <svg className={styles.closeIcon} width="24" height="24">
                        <use href={`${icons}#icon-x`}/>
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
