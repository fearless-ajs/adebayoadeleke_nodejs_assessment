import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isFetching: false, // To check if user is already logged in
    isLoading: false,
    sessionError: null,
    loginError: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.CHECK_USER_SESSION:
            return {
                ...state,
                sessionError: null,
                loginError: null,
                isLoading: false,
                isFetching: true
            }
        case UserActionTypes.SIGN_IN_START:
            return {
                ...state,
                sessionError: null,
                loginError: null,
                isLoading: true,
                isFetching: false
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                sessionError: null,
                loginError: null,
                isLoading:  false,
                isFetching: false
            };
        case UserActionTypes.SIGN_OUT_START:
            return {
                ...state,
                currentUser: null,
                loginError: null,
                isLoading: true,
                isFetching: false
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                sessionError: null,
                loginError: null,
                isLoading: false,
                isFetching: false
            }
        case UserActionTypes.USER_SESSION_FAILURE:
            return {
                ...state,
                sessionError: action.payload,
                loginError: null,
                isLoading: false,
                isFetching: false
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                sessionError: null,
                loginError: action.payload,
                isLoading: false,
                isFetching: false
            }
        default:
            return state;
    }
};

export default userReducer;