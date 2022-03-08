import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { Link, withRouter } from 'react-router-dom';

// SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { setCurrentSetting } from "../../redux/setting/setting.actions";
import { updateSettingStart } from "../../redux/setting/setting.actions";
import { setCurrentRoute } from "../../redux/routing/routing.actions";
import {
    selectCurrentSetting,
    selectIsCurrentSettingFetching,
    selectIsUpdating,
    selectUpdateError
} from "../../redux/setting/setting.selectors";

import FormInput from "../../components/form-elements/form-input.component";
import FormButton from "../../components/form-elements/form-buttom.component";
import ButtonSpinner from "../../components/spinners/button-spinner.component";
import Settings from "../../backend/System";
import AppContainerComponent from "../../components/layouts/app-container.component";
import System from "../../backend/System";


class SettingsPage extends React.Component{
    constructor(props) {
        super(props);

        const setting  = this.props.currentSetting;
        this.state = {
            errorCode: false,
            loading: false,
            uploadPercentage: 0,
            name: setting.name,
            domain: setting.domain,
            email: setting.email,
            phone: setting.phone,
            notificationEmail: setting.notificationEmail,
            notificationEmailPassword: setting.notificationEmailPassword,
            facebookPageLink: setting.facebookPageLink,
            twitterPageLink: setting.twitterPageLink,
            instagramPageLink: setting.instagramPageLink,
            address: setting.address,
            location: setting.location,
            city: setting.city,
            state: setting.state,
            country: setting.country,
            postcode: setting.postcode,
            favicon: setting.favicon,
            icon: setting.icon,

            currentFavicon: '',
            currentIcon:''
        }

        this.Swal = withReactContent(Swal)
    }

    componentDidMount() {
        //Sets Current route
        this.props.setCurrentRoute(this.props.location.pathname);
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    handleFileChange = (event) => {
        const { files, name } = event.target;
        this.setState({ [name]: files[0] });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await this.setState({ loading: true });

        // Create the formData
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('domain', this.state.domain);
        formData.append('email', this.state.email);
        formData.append('phone', this.state.phone);
        formData.append('notificationEmail', this.state.notificationEmail);
        formData.append('notificationEmailPassword', this.state.notificationEmailPassword);
        formData.append('facebookPageLink', this.state.facebookPageLink);
        formData.append('twitterPageLink', this.state.twitterPageLink);
        formData.append('instagramPageLink', this.state.instagramPageLink);
        formData.append('address', this.state.address);
        formData.append('location', this.state.location);
        formData.append('city', this.state.city);
        formData.append('state', this.state.state);
        formData.append('country', this.state.country);
        formData.append('postcode', this.state.postcode);

        formData.append('icon', this.state.icon);
        formData.append('favicon', this.state.favicon);

        this.props.updateSettingStart(formData)

    }

    render() {
        const { currentSetting, updateError, isFetching, isUpdating } = this.props
        return (

            <AppContainerComponent>
                <div className="row flex-column-reverse flex-md-row">
                    <form onSubmit={this.handleSubmit} >
                        <div className="col-md-8">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="profile" role="tabpanel"
                                     aria-labelledby="profile-tab">
                                    <div className="mb-4">
                                        <div className="d-flex flex-column flex-md-row text-center text-md-start mb-3">
                                            <figure className="me-4 flex-shrink-0">
                                                <img width="100" className="rounded-pill"
                                                     src={System.systemImagePath(this.state.icon)} alt="..." />
                                            </figure>
                                            <div className="flex-fill">
                                                <h5 className="mb-3">{this.state.name}</h5>
                                                <button className="btn btn-primary me-2">System information</button>
                                                <button className="btn btn-outline-danger btn-icon" data-bs-toggle="tooltip"
                                                        title="Remove Avatar">
                                                    <i className="bi bi-trash me-0"></i>
                                                </button>
                                                <p className="small text-muted mt-3">For best results, use an image at least
                                                    256px by 256px in either .jpg or .png format</p>
                                            </div>
                                        </div>
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <h6 className="card-title mb-4">Basic Information</h6>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">App Name</label>
                                                            <FormInput
                                                                placeholder="App name"
                                                                type="text"
                                                                name='name'
                                                                handleChange={this.handleChange}
                                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                                value={this.state.name}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Domain</label>
                                                            <FormInput
                                                                placeholder="Domain name"
                                                                handleChange={this.handleChange}
                                                                name='domain'
                                                                type="text"
                                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                                value={this.state.domain}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Notification Email</label>
                                                            <FormInput
                                                                placeholder="Notification Email"
                                                                name='notificationEmail'
                                                                handleChange={this.handleChange}
                                                                type="text"
                                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                                value={this.state.notificationEmail}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Notification Email Password</label>
                                                            <FormInput
                                                                placeholder="Notification Email Password"
                                                                handleChange={this.handleChange}
                                                                name='notificationEmailPassword'
                                                                type="text"
                                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                                value={this.state.notificationEmailPassword}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Facebook Link</label>
                                                            <FormInput
                                                                placeholder="Facebook Page"
                                                                handleChange={this.handleChange}
                                                                name='facebookPageLink'
                                                                type="text"
                                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                                value={this.state.facebookPageLink}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Icon <sup>(Max 200kb)</sup></label>
                                                            <img src={`${Settings.systemImagePath(currentSetting.favicon)}`} style={{
                                                                width: '8%',
                                                                marginLeft: '10px'
                                                            }}/>
                                                            <FormInput
                                                                type="file"
                                                                name='icon'
                                                                handleChange={this.handleFileChange}
                                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">City</label>
                                                            <FormInput
                                                                placeholder="City"
                                                                handleChange={this.handleChange}
                                                                name='city'
                                                                type="text"
                                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                                value={this.state.city}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">State</label>
                                                            <FormInput
                                                                placeholder="State"
                                                                handleChange={this.handleChange}
                                                                name='state'
                                                                type="text"
                                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                                value={this.state.state}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Email</label>
                                                            <FormInput
                                                                placeholder="Email"
                                                                handleChange={this.handleChange}
                                                                name='email'
                                                                type="email"
                                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                                value={this.state.email}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Phone</label>
                                                            <FormInput
                                                                placeholder="Phone number"
                                                                handleChange={this.handleChange}
                                                                name='phone'
                                                                type="text"
                                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                                value={this.state.phone}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Favicon <sup>(Max 200kb)</sup></label>
                                                            <img src={`${Settings.systemImagePath(currentSetting.favicon)}`} style={{
                                                                width: '8%',
                                                                marginLeft: '10px'
                                                            }}/>
                                                            <FormInput
                                                                type="file"
                                                                name='favicon'
                                                                handleChange={this.handleFileChange}
                                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <h6 className="card-title mb-4">Socials</h6>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Twitter Page</label>
                                                        <FormInput
                                                            placeholder="Twitter Page"
                                                            handleChange={this.handleChange}
                                                            name='twitterPageLink'
                                                            type="text"
                                                            className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                            value={this.state.twitterPageLink}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Instagram Page</label>
                                                        <FormInput
                                                            placeholder="Instagram Page"
                                                            handleChange={this.handleChange}
                                                            type="text"
                                                            name='instagramPageLink'
                                                            className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                            value={this.state.instagramPageLink}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Address</label>
                                                        <FormInput
                                                            placeholder="Address"
                                                            handleChange={this.handleChange}
                                                            type="text"
                                                            name='address'
                                                            className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                            value={this.state.address}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <FormButton type="submit" disabled={isUpdating} category='primary' >
                                                            { isUpdating ? (<ButtonSpinner />): 'Save settings' }
                                                        </FormButton>
                                                    </div>

                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Country</label>
                                                        <FormInput
                                                            placeholder="Country"
                                                            handleChange={this.handleChange}
                                                            type="text"
                                                            name='country'
                                                            className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                            value={this.state.country}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Post Code</label>
                                                        <FormInput
                                                            placeholder="Post Code"
                                                            handleChange={this.handleChange}
                                                            type="text"
                                                            name='postcode'
                                                            className={'form-control ' + ((updateError)? 'is-invalid' : '')}
                                                            value={this.state.postcode}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </AppContainerComponent>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentSetting: setting => dispatch(setCurrentSetting(setting)),
    setCurrentRoute: route => dispatch(setCurrentRoute(route)),
    updateSettingStart: formData => dispatch(updateSettingStart({formData}))
});

const mapStateToProps = createStructuredSelector({
    currentSetting: selectCurrentSetting,
    isUpdating: selectIsUpdating,
    isFetching: selectIsCurrentSettingFetching,
    updateError: selectUpdateError
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsPage));