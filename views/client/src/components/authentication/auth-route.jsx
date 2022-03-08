import React from "react";
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const notify = withReactContent(Swal);

const AuthRoute = ({ currentUser, match, location, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render = {props => {
                if (currentUser){
                    // Check if the user has a registered profile
                    return <Component { ...props } />;
                }else {
                    return <Redirect to='/admin/sign-in' />;
                }
             }}
        />
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});
export default withRouter(connect(mapStateToProps)(AuthRoute));