import React, { useReducer, useRef, useEffect } from "react";
import { useAuthRedux } from "@/hooks/useAuthRedux";
import SignInModal from "@/components/signInModal/SignInModal";
import SignUpModal from "@/components/signUpModal/SignUpModal";
import {
  modalReducer,
  initialModalState,
  OPEN_SIGNIN,
  OPEN_SIGNUP,
  CLOSE,
} from "@/hooks/singInSignUpModal.js";

const PrivateContentArea = ({ children }) => {
  const { isAuthenticated } = useAuthRedux();
  const [state, dispatch] = useReducer(modalReducer, initialModalState);
  const lastActionRef = useRef(null);
  const lastActionTypeRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && lastActionRef.current) {
      lastActionRef.current();
      lastActionRef.current = null;
      lastActionTypeRef.current = null;
      dispatch({ type: CLOSE });
    }
  }, [isAuthenticated]);

  const handleClose = () => {
    lastActionTypeRef.current = null;
    dispatch({ type: CLOSE });
  };

  const handleClick = (e, originalHandler) => {
    if (!isAuthenticated) {
      if (e) e.preventDefault();
      if (!lastActionRef.current) {
        lastActionRef.current = () => {
          if (originalHandler) originalHandler(e);
          if (e && e.target) e.target.click && e.target.click();
        };
        lastActionTypeRef.current = "initial";
      }
      dispatch({ type: OPEN_SIGNIN });
    } else {
      if (originalHandler) originalHandler(e);
    }
  };

  const handleOpenSignUp = () => {
    dispatch({ type: OPEN_SIGNUP });
    lastActionTypeRef.current = "signup";
  };

  let gatedChild = children;

  if (!isAuthenticated) {
    if (React.isValidElement(children)) {
      gatedChild = React.cloneElement(children, {
        onClick: (e) => handleClick(e, children.props.onClick),
        style: {
          ...children.props.style,
          cursor: "pointer",
        },
        tabIndex: 0,
        role: children.type === "a" ? "link" : undefined,
      });
    } else {
      gatedChild = (
        <span
          onClick={(e) => handleClick(e)}
          style={{ cursor: "pointer" }}
          tabIndex={0}
        >
          {children}
        </span>
      );
    }
  }

  return (
    <>
      {gatedChild}
      {state.modalOpen === "signin" && (
        <SignInModal onClose={handleClose} onOpenSignUp={handleOpenSignUp} />
      )}
      {state.modalOpen === "signup" && (
        <SignUpModal
          onClose={handleClose}
          onOpenSignIn={() => dispatch({ type: OPEN_SIGNIN })}
        />
      )}
    </>
  );
};

export default PrivateContentArea;
