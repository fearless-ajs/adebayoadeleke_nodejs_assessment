import { takeLatest, put, all, call } from 'redux-saga/effects';
import { UserActionTypes } from "./user.types";
import history from "../../history";
import Notify from "../../utils/Notify";

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    userSessionFailure
} from "./user.actions";
import Auth from "../../backend/Auth";

// SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const notify = withReactContent(Swal);


/** ------------------------------------------------------------------- **/
// Asynchronous logic/ other controllers
// Payload automatically comes in as an object
/** ------------------------------------------------------------------- **/
export function* isUserAuthenticated() {
    try {
        // Check User Authentication status
        const userAuth =  yield Auth.isUserLoggedIn();
        yield put(signInSuccess(userAuth.data));
        // Alert the user of the authentication
        Notify.success("Session restored.")
        // Redirects to the your last route if it is defined

    }catch (error) {
        yield put(userSessionFailure(error.response));
        Notify.error("Fail to restore session ")
    }
}

export function* signIn({payload: { email, password }}) {
    try{
        const userAuth = yield Auth.authenticateUser(email, password);
        yield put(signInSuccess(userAuth.data));
        yield Notify.success("Logged in successfully");
        history.push('/admin')
    }catch(error) {
        const { err, message } = error.response.data;
        Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: message,
            showConfirmButton: true,
        });
        yield put(signInFailure(error.response))
    }
}

export function* signOut() {
   try{
       yield Auth.logout();
       yield put(signOutSuccess());
       yield Notify.success("Logged out successfully");
       history.push('/admin/sign-in');
   }catch (error) {
       yield put(signOutFailure(error.response))
       yield Notify.error("Logout error");
   }
}

/** ------------------------------------------------------------------- **/
// LISTENERS
/** ------------------------------------------------------------------- **/
export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignInStart() {
    yield takeLatest(UserActionTypes.SIGN_IN_START, signIn)
}

export function* onSignOut() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onSignInStart),
        call(onSignOut)
    ])
}