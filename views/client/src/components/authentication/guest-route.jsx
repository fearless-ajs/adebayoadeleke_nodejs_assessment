import React from "react";
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import {selectLastAttemptedRoute} from "../../redux/routing/routing.selectors";
import {selectCurrentSetting} from "../../redux/setting/setting.selectors";

const GuestRoute = ({ currentUser, currentSetting, component: Component, lastAttemptedRoute, history, ...rest }) => {
    return (
        <Route
            {...rest}
            render = {props => {
                if (!currentUser || !currentSetting){
                    return <Component { ...props } />;
                }else {
                    // Redirects user to the last visited route
                    return <Redirect to={lastAttemptedRoute} />;
                }
            }}
        />
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentSetting: selectCurrentSetting,
    lastAttemptedRoute: selectLastAttemptedRoute
});
export default withRouter(connect(mapStateToProps)(GuestRoute));