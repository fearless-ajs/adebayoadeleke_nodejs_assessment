import { RoutingActionTypes } from "./routing.types";

export const setCurrentRoute = route => ({
   type: RoutingActionTypes.SET_CURRENT_ROUTE,
   payload: route
});

export const setLastAttemptedRoute = route => ({
   type: RoutingActionTypes.SET_LAST_ATTEMPTED_ROUTE,
   payload: route
});

export const setResumeSavedRoute = () => ({
   type: RoutingActionTypes.SET_RESUME_SAVED_ROUTE,
});


