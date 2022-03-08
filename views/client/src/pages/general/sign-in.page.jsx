import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";


// Custom components
import FormInput from "../../components/form-elements/form-input.component";
import FormButton from "../../components/form-elements/form-buttom.component";

import { signInStart } from "../../redux/user/user.actions";

import ButtonSpinner from "../../components/spinners/button-spinner.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentUserLoadingStatus, selectCurrentUserLoginError } from "../../redux/user/user.selectors";
import { selectCurrentUserSessionError } from "../../redux/user/user.selectors";


const SignInPage = ({ signInStart, loginError, sessionError, isLoading }) => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });
    const { email, password } = userCredentials;


  const handleSubmit = async (event) => {
      event.preventDefault();
      signInStart(email, password);
    }


    const handleChange = event => {
        const { value, name } = event.target;
        setUserCredentials({...userCredentials, [name]: value });
    };


    return (
        <div className='hold-transition login-page'>
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <Link className='h1' to='/'>
                            <b>Jane</b>LTE
                        </Link>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <FormInput
                                    type="email"
                                    name='email'
                                    className={ ` form-control ${loginError? 'is-invalid': ''} `}
                                    value={email}
                                    handleChange={handleChange}
                                    placeholder="Email"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <FormInput
                                    type="password"
                                    name='password'
                                    className={`form-control ${loginError? 'is-invalid': ''} `}
                                    value={password}
                                    handleChange={handleChange}
                                    placeholder="Password"  />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <FormInput type="checkbox" id="remember"  />
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <FormButton type="submit" disabled={isLoading} category='primary' >
                                        { isLoading ? (<ButtonSpinner />): 'Sign In' }
                                    </FormButton>
                                </div>
                            </div>
                        </form>

                        <p className="mb-1">
                            <Link to='#'>
                                <a href="#">I forgot my password</a>
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );

}

//For setting values on the state with redux
const mapDispatchToProps = dispatch => ({
    signInStart: (email, password) => dispatch(signInStart({ email, password })),
});
const mapStateToProps = createStructuredSelector({
    loginError: selectCurrentUserLoginError,
    sessionError: selectCurrentUserSessionError,
    isLoading: selectCurrentUserLoadingStatus
});
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
