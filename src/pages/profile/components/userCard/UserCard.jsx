import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Heading, Text } from "@/components/ui";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import RecipePreviewList from "../recipePreviewList/RecipePreviewList";
import { useDeviceType } from "@/hooks/useDeviceType";
import icons from "@/assets/icons/icons.svg";
import styles from "./UserCard.module.css";
import { DEFAULT_AVATAR } from "@/services/api";

const UserCard = ({ user, onButtonClick, tabType }) => {
  const navigate = useNavigate();
  const firstName = user.name ? user.name.split(" ")[0] : "";

  const avatarUrl = user.avatar || DEFAULT_AVATAR;

  const { isMobile, isTablet, isDesktop } = useDeviceType();

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
      return "Following";
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
          <Button
            variant={Button.variants.SECONDARY}
            onClick={handleButtonClick}
            className={styles.actionButton}
            href={null}
            to={null}
            isLoading={false}
            type="button"
          >
            {getButtonText()}
          </Button>
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
            <use href={`${icons}#icon-arrow-up-right`} />
          </svg>
        </ButtonIcon>
      </div>
    </div>
  );
};

export default UserCard;
export { UserCard };
