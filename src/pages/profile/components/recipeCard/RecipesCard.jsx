import styles from "./RecipeCard.module.css";
import icons from "../../../../assets/icons/icons.svg";
import { NavLink, useParams } from "react-router-dom";
import SmallRecipePhoto from "./RecipePhotoCard.jsx";
import { Button, ButtonIcon } from "@/components/ui";
import { FiArrowUpRight } from "react-icons/fi";

const RecipeCard = ({ data, onDelete }) => {
  const { userId } = useParams();
  const isViewingOtherUser = !!userId;

  return (
    <li className={styles.recipeCardWrapper}>
      <div className={styles.flexPhotoWrapper}>
        <SmallRecipePhoto imgUrl={data.image} title={data.title} />
        <div className={styles.recipeTextWrapper}>
          <h5 className={styles.recipeTitle}>{data.title}</h5>
          <p className={styles.recipeInstructions}>{data.instructions}</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <NavLink to={`/recipe-details/${data.id}`} className={styles.navLink}>
          <FiArrowUpRight width="16" height="16" />
        </NavLink>
        {!isViewingOtherUser && (
          <ButtonIcon
            className="myrecipeTrash"
            variant={Button.variants.SECONDARY}
            onClick={() => onDelete(data._id)}
          >
            <svg width="16" height="16">
              <use href={`${icons}#icon-trash`} />
            </svg>
          </ButtonIcon>
        )}
      </div>
    </li>
  );
};

export default RecipeCard;
