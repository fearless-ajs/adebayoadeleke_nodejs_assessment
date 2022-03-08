import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectCurrentUserFetchingStatus = createSelector(
    [selectUser],
    user => user.isFetching
);

export const selectCurrentUserLoadingStatus = createSelector(
    [selectUser],
    user => user.isLoading
);

export const selectCurrentUserSessionError = createSelector(
    [selectUser],
    user => user.sessionError
);

export const selectCurrentUserLoginError = createSelector(
    [selectUser],
    user => user.loginError
);