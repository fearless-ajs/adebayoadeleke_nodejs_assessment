import React from 'react';
import { withRouter } from 'react-router-dom';
import SignInComponent from "../../components/authentication/sign-in.component";
import './../../assets/css/all.min.css';
import './../../assets/css/adminlte.css';
import './../../assets/css/icheck-bootstrap.min.css';

const LoginPage = () => (
    <SignInComponent />
);

export default withRouter(LoginPage);