import React from "react";
import {useNavigate} from "react-router-dom";
import {Heading, Text} from "@/components/ui";
import {ButtonIcon} from "@/components/ui/ButtonIcon";
import RecipePreviewList from "../recipePreviewList/RecipePreviewList";
import {useDeviceType} from "@/hooks/useDeviceType";
import icons from "@/assets/icons/icons.svg";
import styles from "./UserCard.module.css";
import {DEFAULT_AVATAR} from "@/services/api";
import {FiLoader} from "react-icons/fi";

const UserCard = ({user, onButtonClick, tabType, isLoading = false}) => {
    const navigate = useNavigate();
    const firstName = user.name ? user.name.split(" ")[0] : "";

    const avatarUrl = user.avatar || DEFAULT_AVATAR;

    const {isMobile, isTablet, isDesktop} = useDeviceType();

    const getPreviewCount = () => {
        if (isMobile) return 0;
        if (isTablet) return 3;
        if (isDesktop) return 4;
        return 0;
    };

    const previewCount = getPreviewCount();
    const shouldShowPreview = previewCount > 0;

    const handleNavigateToProfile = () => {
        navigate(`/profile/${user.id}`);
    };

    const handleButtonClick = () => {
        onButtonClick(user.id);
    };

    const getUserCardClass = () => {
        if (tabType === "followers") {
            return styles.followerUserCard;
        } else if (tabType === "following") {
            return styles.followingUserCard;
        }
        return styles.userCard;
    };

    const getButtonText = () => {
        if (tabType === "followers") {
            return "Follow";
        } else if (tabType === "following") {
            return "Unfollow";
        }
        return "Follow";
    };

    return (
        <div className={getUserCardClass()}>
            <div className={styles.userDetails}>
                <div className={styles.avatar}>
                    <img
                        src={avatarUrl}
                        alt={`${user.name} avatar`}
                        className={styles.avatarImg}
                    />
                </div>
                <div className={styles.userInfo}>
                    <Heading
                        level={3}
                        size="sm"
                        weight="bold"
                        className={styles.userName}
                    >
                        {firstName}
                    </Heading>
                    <Text size="sm" color="muted" className={styles.recipeCount}>
                        Own recipes: {user.recipesCount || 0}
                    </Text>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (!isLoading) {
                                handleButtonClick();
                            }
                        }}
                        className={`${styles.actionButton}`}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            borderRadius: '30px',
                            border: '1px solid var(--btn-primary-border)',
                            backgroundColor: 'var(--btn-primary-bg)',
                            color: 'var(--btn-primary-text)',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            transition: 'all var(--transition-fast)',
                            position: 'relative',
                            opacity: isLoading ? '0.6' : '1'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = 'var(--color-primary)';
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
                            e.currentTarget.style.color = 'var(--btn-primary-text)';
                            e.currentTarget.style.borderColor = 'var(--btn-primary-border)';
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                        }}
                    >
                        {isLoading ? (
                            <FiLoader
                                style={{
                                    animation: 'rotate var(--transition-slow) infinite',
                                    width: '16px',
                                    height: '16px'
                                }}
                            />
                        ) : (
                            getButtonText()
                        )}
                    </a>
                </div>
            </div>

            {shouldShowPreview && (
                <div className={styles.previewContainer}>
                    <RecipePreviewList
                        recipesPreview={user.recipesPreview}
                        maxPreviews={previewCount}
                    />
                </div>
            )}

            <div className={styles.button}>
                <ButtonIcon
                    onClick={handleNavigateToProfile}
                    className={styles.iconButton}
                >
                    <svg className={styles.icon} width="16" height="16">
                        <use href={`${icons}#icon-arrow-up-right`}/>
                    </svg>
                </ButtonIcon>
            </div>
        </div>
    );
};

export default UserCard;
export {UserCard};
