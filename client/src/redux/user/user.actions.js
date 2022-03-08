import { UserActionTypes } from "./user.types";

export const setCurrentUser = user => ({
   type: UserActionTypes.SET_CURRENT_USER,
   payload: user
});

export const signInSuccess = user => ({
   type: UserActionTypes.SIGN_IN_SUCCESS,
   payload: user
});

export const signInFailure = error => ({
   type: UserActionTypes.SIGN_IN_FAILURE,
   payload: error
});

export const userSessionFailure = error => ({
   type: UserActionTypes.USER_SESSION_FAILURE,
   payload: error
});

export const signInStart = emailAndPassword => ({
   type: UserActionTypes.SIGN_IN_START,
   payload: emailAndPassword
});

export const checkUserSession = () => ({
   type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
   type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
   type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
   type: UserActionTypes.SIGN_OUT_FAILURE,
   payload: error
});
