import { takeLatest, put, all, call } from 'redux-saga/effects';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


import { SettingActionTypes } from "./setting.types";
import {fetchSettingSuccess, fetchSettingFailure, fetchSettingStart, updateSettingSuccess, updateSettingFailure} from "./setting.actions";
import System from "../../backend/System";
import {UserActionTypes} from "../user/user.types";
import Settings from "../../backend/System";
import Notify from "../../utils/Notify";
const notify = withReactContent(Swal);

/** ------------------------------------------------------------------- **/
// Asynchronous logic/ other controllers
// Payload automatically comes in as an object
/** ------------------------------------------------------------------- **/
export function* fetchSetting() {
    try{
       const setting  = yield System.fetchCurrentSettings()
        const { settings } = setting.data.data;
        //Update the redux state
        yield put(fetchSettingSuccess(settings));
    }catch (error) {
        yield put(fetchSettingFailure(error.response))
        notify.fire({
            icon: 'error',
            title: 'System Error',
            text: error.response.message,
            showConfirmButton: true,
        });

    }
}

export function* initiateFetchSetting() {
    yield put(fetchSettingStart());
}

export function* updateSetting({payload: { formData }}) {
    try{
       const response =  yield Settings.updateSettings(formData);
        const { settings } = response.data.data;
        console.log(settings);
        yield put(updateSettingSuccess(settings));
        Notify.success('System Information Updated')

    }catch (error) {
        const { message } = error.response.data
        yield put(updateSettingFailure(error.response.data));
        notify.fire({
            icon: 'error',
            title: 'Update Failed',
            timerProgressBar: true,
            showConfirmButton: true,
            text: message,
            timer: 100000
        });
    }

}


/** ------------------------------------------------------------------- **/
// LISTENERS
/** ------------------------------------------------------------------- **/
export function* onFetchSetting() {
    yield takeLatest(SettingActionTypes.FETCH_SETTING_START, fetchSetting)
}

export function* onUpdateSetting() {
    yield takeLatest(SettingActionTypes.UPDATE_SETTING_START, updateSetting)
}

export function* onSignInSuccess() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, initiateFetchSetting)
}

export function* settingSagas() {
    yield all([
        call(onFetchSetting),
        call(onSignInSuccess),
        call(onUpdateSetting)
    ])
}