import React from "react";
import {NavLink} from "react-router-dom";
import css from "./UserDropDown.module.css";
import {GoArrowUpRight} from "react-icons/go";

const UserDropDown = ({onProfileClick, onLogoutClick}) => {
    return (
        <div className={css.dropdown}>
            <NavLink
                to="/profile"
                className={({isActive}) =>
                    isActive ? `${css.link} ${css.active}` : css.link
                }
                onClick={onProfileClick}
            >
                PROFILE
            </NavLink>

            <button className={css.button} onClick={onLogoutClick}>
                LOG OUT <GoArrowUpRight className={css.arrowIcon}/>
            </button>
        </div>
    );
};

export default UserDropDown;
