import React from "react";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import  { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";
import System from "../../backend/System";

const UserMenuDropdownComponent = ({ signOutUser, currentUser }) => {

    const logout = (event) => {
        event.preventDefault();
        signOutUser();
    }


    return (
        <div className="dropdown">
            <a href="#" className="d-flex align-items-center" data-bs-toggle="dropdown">
                <div className="avatar me-3">
                    <img src={System.userImagePath(currentUser.user.image)}
                         className="rounded-circle" alt="image" />
                </div>
                <div>
                    <div className="fw-bold">{currentUser.user.name}</div>
                    <small className="text-muted">{currentUser.user.email}</small>
                </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
                <Link to="/admin/profile" className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-person dropdown-item-icon"></i> Profile
                </Link>
                <a href="#" className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-envelope dropdown-item-icon"></i> Inbox
                </a>
                <a href="#"   className="dropdown-item d-flex align-items-center" data-sidebar-target="#settings">
                    <i className="bi bi-gear dropdown-item-icon"></i> Settings
                </a>
                <a href="#" onClick={logout} className="dropdown-item d-flex align-items-center text-danger"
                   target="_blank">
                    <i className="bi bi-box-arrow-right dropdown-item-icon"></i> Logout
                </a>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    signOutUser: () => dispatch(signOutStart()),
})
export default connect(mapStateToProps, mapDispatchToProps)(UserMenuDropdownComponent);