import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";


// SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


// Custom components
import FormInput from "../form-elements/form-input.component";
import FormButton from "../form-elements/form-buttom.component";

import { setCurrentUser } from "../../redux/user/user.actions";
import { setCurrentRoute } from "../../redux/routing/routing.actions";

import Auth from "../../backend/Auth";
import ButtonSpinner from "../spinners/button-spinner.component";

class SignInComponent extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false,
            errorCode: null,
        }
        this.Swal = withReactContent(Swal)
    }

    handleSubmit = async (event) => {
        event.preventDefault();


        const { email, password } = this.state;
        this.setState({ loading: true });

        await Auth.authenticateUser(email, password)
            .then(response => {
            const userData = response.data;

            this.props.setCurrentUser({
                ...userData
            });
            this.Swal.fire({
                icon: 'success',
                title: 'Logged In Successfully',
                timerProgressBar: true,
                showConfirmButton: false,
                timer: 1500
            });
            this.setState({email: '', password: ''});
            this.setState({ loading: false });
        }).catch(error => {
            const { err, message } = error.response.data;
            this.Swal.fire({
                icon: 'error',
                title: 'Authentication Error',
                text: message,
                showConfirmButton: true,
            });
            this.setState({ loading: false });
            this.setState({ errorCode: err.statusCode });
        });
    }


    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
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

                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group mb-3">
                                    <FormInput
                                        type="email"
                                        name='email'
                                        className={ ' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                        value={this.state.email}
                                        handleChange={this.handleChange}
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
                                        className={  ' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')} value={this.state.password}  handleChange={this.handleChange} placeholder="Password"  />
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
                                        <FormButton type="submit" disabled={this.state.loading} category='primary' >
                                           { this.state.loading ? (<ButtonSpinner />): 'Sign In' }
                                        </FormButton>
                                    </div>
                                </div>
                            </form>

                            <p className="mb-1">
                                <Link to='#'>
                                    <a href="forgot-password.html">I forgot my password</a>
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

//For setting values on the state with redux
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setCurrentRoute: route => dispatch(setCurrentRoute(route))
});
export default connect(null, mapDispatchToProps)(SignInComponent);
