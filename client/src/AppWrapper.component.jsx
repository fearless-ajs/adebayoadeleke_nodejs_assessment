import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { setCurrentSetting } from "./redux/setting/setting.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

// React Components
import DashboardPage from "./pages/general/dashboard.page";
import SignInPage from "./pages/general/sign-in.page";
import SettingsPage from "./pages/general/settings.page";
import CurrentUserProfilePage from "./pages/general/current-user-profile.page";
import GuestRoute from "./components/authentication/guest-route";
import AdminRoute from "./components/authentication/admin-route";

// Stylesheet
// import './App.css';
import CreateUserPage from "./pages/general/create-user.page";
import SuperAdminRoute from "./components/authentication/super-admin-route";

const AppWrapper = () => {
    return (
        <Switch>
            <GuestRoute exact path='/admin/sign-in' component={SignInPage} />
            <AdminRoute exact path='/admin' component={DashboardPage}/>
            <AdminRoute exact path='/admin/profile' component={CurrentUserProfilePage}/>
            <AdminRoute exact path='/admin/settings' component={SettingsPage} />
            <SuperAdminRoute exact path='/admin/create-user' component={CreateUserPage} />
            {/*<Route exact path='admin/*' component={SignInPage} />*/}
        </Switch>
    );

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    setCurrentSetting: setting => dispatch(setCurrentSetting(setting)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppWrapper));
