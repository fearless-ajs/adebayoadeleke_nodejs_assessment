import { SettingActionTypes } from "./setting.types";

export const setCurrentSetting = setting => ({
   type: SettingActionTypes.SET_CURRENT_SETTING,
   payload: setting
});

export const fetchSettingStart = () => ({
   type: SettingActionTypes.FETCH_SETTING_START,
});

export const fetchSettingSuccess = (setting) => ({
   type: SettingActionTypes.FETCH_SETTING_SUCCESS,
   payload: setting
});

export const fetchSettingFailure = (error) => ({
   type: SettingActionTypes.FETCH_SETTING_FAILURE,
   payload: error
});

export const updateSettingStart = formData => ({
   type: SettingActionTypes.UPDATE_SETTING_START,
   payload: formData
});

export const updateSettingSuccess = setting => ({
   type: SettingActionTypes.UPDATE_SETTING_SUCCESS,
   payload: setting
});

export const updateSettingFailure = error => ({
   type: SettingActionTypes.UPDATE_SETTING_FAILURE,
   payload: error
});

export const setSettingUploadProgress = percentage => ({
   type: SettingActionTypes.SET_SETTING_UPLOAD_PROGRESS,
   payload: percentage
});

export const setRouteMountStatus = status => ({
   type: SettingActionTypes.SET_ROUTE_MOUNT_STATUS,
   payload: status
});
