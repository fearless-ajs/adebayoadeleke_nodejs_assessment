import { SettingActionTypes } from "./setting.types";

const INITIAL_STATE = {
    currentSetting: null,
    isFetching: false,
    isUpdating: false,
    updateError: null,
    currentRouteMountStatus: false,
}

const settingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SettingActionTypes.UPDATE_SETTING_START:
            return {
                ...state,
                isUpdating: true
            }
        case SettingActionTypes.UPDATE_SETTING_SUCCESS:
            return {
                ...state,
                currentSetting: action.payload,
                updateError: null,
                isUpdating: false
            }
        case SettingActionTypes.UPDATE_SETTING_FAILURE:
            return {
                ...state,
                currentSetting: action.payload,
                updateError: action.payload,
                isUpdating: false
            }
        case SettingActionTypes.FETCH_SETTING_START:
            return {
                ...state,
                isFetching: true
            }
        case SettingActionTypes.FETCH_SETTING_SUCCESS:
            return {
                ...state,
                currentSetting: action.payload,
                isFetching: false
            }
        case SettingActionTypes.FETCH_SETTING_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        case SettingActionTypes.SET_ROUTE_MOUNT_STATUS:
            return {
                ...state,
                currentRouteMountStatus: action.payload
            }
        case SettingActionTypes.SET_SETTING_UPLOAD_PROGRESS:
            return {
                ...state,
                currentProgress: action.payload
            }
        default:
            return state;
    }
}

export default settingReducer;