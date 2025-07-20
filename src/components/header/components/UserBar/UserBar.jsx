import React, { useState, useRef, useEffect } from "react";
import css from "./UserBar.module.css";
import defaultAvatar from "@assets/react.svg"; // додати зображення на дефолтний аватар
import Modal from "../../../modal/Modal.jsx";
import clsx from "clsx";
import UserDropDown from "@components/ui/UserDropDown/UserDropDown.jsx";
import { GoChevronDown } from "react-icons/go";
import LogOutModal from "@components/logOutModal/LogOutModal.jsx";
import { useAuthRedux } from "@/hooks/useAuthRedux";

const UserBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, isAuthenticated, fetchCurrentUser } = useAuthRedux();

  useEffect(() => {
    if (!user && isAuthenticated) {
      fetchCurrentUser();
    }
  }, [user, isAuthenticated, fetchCurrentUser]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const openLogoutModal = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeLogoutModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.wrapper} ref={dropdownRef}>
      <button
        className={clsx(css.button, isDropdownOpen && css.buttonOpen)}
        onClick={toggleDropdown}
      >
        <img
          src={user.avatar || defaultAvatar}
          alt="User Avatar"
          className={css.avatar}
        />
        <span className={css.username}>{user.name}</span>
        <GoChevronDown
          className={clsx(css.icon, isDropdownOpen && css.iconOpen)}
        />
      </button>

      <div
        className={clsx(
          css.dropdownContainer,
          isDropdownOpen && css.dropdownVisible
        )}
      >
        <UserDropDown
          onProfileClick={() => setIsDropdownOpen(false)}
          onLogoutClick={openLogoutModal}
        />
      </div>

      {isModalOpen && (
        <Modal onClose={closeLogoutModal}>
          <LogOutModal onClose={closeLogoutModal} />
        </Modal>
      )}
    </div>
  );
};

export default UserBar;
