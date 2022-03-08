import React from 'react';
import { connect } from 'react-redux';
import { setCurrentRoute } from "../../redux/routing/routing.actions";
import {Link} from "react-router-dom";
import FormInput from "../../components/form-elements/form-input.component";
import FormButton from "../../components/form-elements/form-buttom.component";
import ButtonSpinner from "../../components/spinners/button-spinner.component";
import AppContainerComponent from "../../components/layouts/app-layout.component";

class CreateUserPage extends React.Component{
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errorCode: null,
        }
    }
    componentDidMount() {
        this.props.setCurrentRoute('/create-user');
    }

    render() {
        return (
            <AppContainerComponent>
                <div  className='hold-transition dark-mode' style={{
                    paddingTop: "100px"
                }}>
                    <div className="login-box" style={{
                        margin: 'auto',
                        top: '150%'
                    }}>
                        <div className="card card-outline card-primary">
                            <div className="card-body">
                                <p className="login-box-msg">Create a new user account</p>

                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-group mb-3">
                                        <FormInput type="email" name='email' className={ ' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')} value={this.state.email} handleChange={this.handleChange} placeholder="Email"  />
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
                                        <div className="col-6">
                                            <FormButton type="submit" disabled={this.state.loading} category='primary' >
                                                { this.state.loading ? (<ButtonSpinner />): 'Create Account' }
                                            </FormButton>
                                        </div>
                                    </div>
                                </form>

                                <p className="mb-1">
                                    <Link to='#'>
                                        <a href="#">Regular users</a>
                                    </Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </AppContainerComponent>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentRoute: route => dispatch(setCurrentRoute(route))
});

export default connect(null, mapDispatchToProps)(CreateUserPage)