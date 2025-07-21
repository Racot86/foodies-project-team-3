export const initialModalState = {
    active: "signin", // 'signin' | 'signup'
    modalOpen: null, // null | 'signin' | 'signup'
};

export const OPEN_SIGNIN = "OPEN_SIGNIN";
export const OPEN_SIGNUP = "OPEN_SIGNUP";
export const CLOSE = "CLOSE";

export function modalReducer(state, action) {
    switch (action.type) {
        case OPEN_SIGNIN:
            return {active: "signin", modalOpen: "signin"};
        case OPEN_SIGNUP:
            return {active: "signup", modalOpen: "signup"};
        case CLOSE:
            return {active: "signin", modalOpen: null};
        default:
            return state;
    }
}
