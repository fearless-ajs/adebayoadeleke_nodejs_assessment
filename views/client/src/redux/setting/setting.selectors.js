import { createSelector } from "reselect";

const selectSetting = state => state.setting;

export const selectCurrentSetting = createSelector(
  [selectSetting],
  setting => setting.currentSetting
);

export const selectIsCurrentSettingFetching = createSelector(
    [selectSetting],
    setting => setting.isFetching
);
export const selectIsUpdating = createSelector(
    [selectSetting],
    setting => setting.isUpdating
);

export const selectUpdateError = createSelector(
    [selectSetting],
    setting => setting.updateError
);

export const selectCurrentRouteMountStatus = createSelector(
    [selectSetting],
    setting => setting.currentRouteMountStatus
);