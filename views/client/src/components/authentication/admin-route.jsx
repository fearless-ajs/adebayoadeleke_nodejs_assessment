import React from "react";
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import UnauthorizedUserComponent from "./unauthorized-user.component";
import { setLastAttemptedRoute } from "../../redux/routing/routing.actions";
import { selectLastAttemptedRoute } from "../../redux/routing/routing.selectors";


const AdminRoute = ({ currentUser, lastAttemptedRoute, setLastAttemptedRoute, location,  component: Component, ...rest }) => {
    let administrator = false;
    //Set the attempted route, i.e the route the user is trying to access
    if (location.pathname !== '/admin/sign-in' && location.pathname !== '/admin/sign-in#'){
        setLastAttemptedRoute(location.pathname);
    }

    if (currentUser){
        currentUser.roles.forEach(role => {
            if (role.role.name === 'administrator' || role.role.name === 'super-administrator'){
                administrator = true;
            }
        });
    }
    return (
        <Route
            {...rest}
            render = {props => {
                if (!currentUser){
                    return <Redirect to='/admin/sign-in' />;
                }else {
                    if (administrator){
                        return <Component { ...props } />;
                    }else {

                        return <UnauthorizedUserComponent />;
                    }
                }

            }}
        />
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    lastAttemptedRoute: selectLastAttemptedRoute
});
const mapDispatchToProps = dispatch => ({
    setLastAttemptedRoute: route => dispatch(setLastAttemptedRoute(route))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminRoute));