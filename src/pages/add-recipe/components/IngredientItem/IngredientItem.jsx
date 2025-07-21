import {Text} from "@/components/ui";
import {IoClose} from "react-icons/io5";
import styles from "./IngredientItem.module.css";

const IngredientItem = ({name, image, quantity, onRemove}) => {
    return (
        <li className={styles.item}>
            <button className={styles.closeBtn} type="button" onClick={onRemove}>
                <IoClose/>
            </button>
            <div className={styles.imgWrap}>
                <img src={image} alt={name} className={styles.image}/>
            </div>
            <div className={styles.infoWrap}>
                <Text
                    size="md"
                    className={styles.subtitleRecipe}
                    weight="medium"
                    style={{
                        marginTop: "0",
                        lineHeight: "1.5",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {name}
                </Text>
                <Text
                    size="md"
                    className={styles.subtitleRecipe}
                    weight="medium"
                    color="muted"
                    style={{
                        marginTop: "0",
                        lineHeight: "1.5",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {quantity}
                </Text>
            </div>
        </li>
    );
};

export default IngredientItem;
