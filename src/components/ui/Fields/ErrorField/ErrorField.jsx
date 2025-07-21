import css from "../Fields.module.css";

export const ErrorField = ({children, id}) => {
    return (
        <p className={css.errorMessage} role="alert" id={id}>
            {children}
        </p>
    );
};
