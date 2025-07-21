import css from "./RecipeCard.module.css";

const EmptyState = ({text}) => {
    return (
        <div className={css.emptyWrap}>
            <p>{text}</p>
        </div>
    );
};

export default EmptyState;
