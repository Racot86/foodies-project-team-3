import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import RecipePreviewList from "../recipePreviewList/RecipePreviewList";
import { useDeviceType } from "@/hooks/useDeviceType";
import icons from "@/assets/icons/icons.svg";
import styles from "./UserCard.module.css";

const UserCard = ({ user, onButtonClick, buttonText = "Follow" }) => {
  const navigate = useNavigate();
  const firstName = user.name ? user.name.split(" ")[0] : "";

  const avatarUrl =
    user.avatar || "https://via.placeholder.com/80x80?text=User";

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
    // Navigate to user profile page
    navigate(`/profile/${user.id}`);
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
          <h3 className={styles.userName}>{firstName}</h3>
          <p className={styles.recipeCount}>
            Own recipes: {user.recipesCount || 0}
          </p>
          <Button
            variant={Button.variants.SECONDARY}
            onClick={() => onButtonClick(user.id)}
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
          <svg width="16" height="16">
            <use href={`${icons}#icon-arrow-up-right`} />
          </svg>
        </ButtonIcon>
      </div>
    </div>
  );
};

export default UserCard;
export { UserCard };
