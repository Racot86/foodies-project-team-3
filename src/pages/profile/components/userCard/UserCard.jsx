import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Heading, Text } from "@/components/ui";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import RecipePreviewList from "../recipePreviewList/RecipePreviewList";
import { useDeviceType } from "@/hooks/useDeviceType";
import icons from "@/assets/icons/icons.svg";
import styles from "./UserCard.module.css";

const UserCard = ({ user, onButtonClick, buttonText = "Follow" }) => {
  const navigate = useNavigate();
  const firstName = user.name ? user.name.split(" ")[0] : "";

  const avatarUrl =
    user.avatar || "https://via.placeholder.com/60x60?text=User";

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
    // Simply call the parent callback - let Redux handle the logic
    onButtonClick(user.id);
  };

  return (
    <div className={styles.userCard}>
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
            {buttonText}
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
          <svg width="18" height="18">
            <use href={`${icons}#icon-arrow-up-right`} />
          </svg>
        </ButtonIcon>
      </div>
    </div>
  );
};

export default UserCard;
export { UserCard };
