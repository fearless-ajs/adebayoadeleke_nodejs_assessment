import { createSelector } from "reselect";

const selectRouting = state => state.routing;

export const selectCurrentRoute = createSelector(
  [selectRouting],
  routing => routing.currentRoute
);

export const selectLastAttemptedRoute = createSelector(
    [selectRouting],
    routing => routing.lastAttemptedRoute
);

export const selectResumeSavedRoute = createSelector(
    [selectRouting],
    routing => routing.resumeSavedRoute
);
