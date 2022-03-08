import React from "react";
import { connect } from "react-redux";
import { setSettingUploadProgress } from "../../redux/setting/setting.actions";

class ProgressSetterComponent extends React.Component{

    setUploadPercentage = (percentage) => {
        this.props.setSettingUploadProgress(percentage)
    }
}
const mapDispatchToProps = dispatch => ({
    setSettingUploadProgress: percentage => dispatch(setSettingUploadProgress(percentage))
});
export default connect(null, mapDispatchToProps)(new ProgressSetterComponent);