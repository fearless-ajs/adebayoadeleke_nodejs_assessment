import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {setCurrentRoute, setResumeSavedRoute } from "../../redux/routing/routing.actions";
import {selectCurrentRoute, selectResumeSavedRoute} from "../../redux/routing/routing.selectors";
import { selectCurrentRouteMountStatus } from "../../redux/setting/setting.selectors";
import { setRouteMountStatus } from "../../redux/setting/setting.actions";
import {createStructuredSelector} from "reselect";
import AppContainerComponent from "../../components/layouts/app-container.component";



class DashboardPage extends React.Component{


     render() {
        return (
            <AppContainerComponent>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col-lg-7 col-md-12">
                        <div className="card widget h-100">
                            <div className="card-header d-flex">
                                <h6 className="card-title">
                                    Sales Chart
                                    <a href="#" className="bi bi-question-circle ms-1 small" data-bs-toggle="tooltip"
                                       title="Daily orders and sales"></a>
                                </h6>
                                <div className="d-flex gap-3 align-items-center ms-auto">
                                    <div className="dropdown">
                                        <a href="#" data-bs-toggle="dropdown" className="btn btn-sm"
                                           aria-haspopup="true"
                                           aria-expanded="false">
                                            <i className="bi bi-three-dots"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <a href="#" className="dropdown-item">View Detail</a>
                                            <a href="#" className="dropdown-item">Download</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-md-flex align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="display-7 me-3">
                                            <i className="bi bi-bag-check me-2 text-success"></i> $10.552,40
                                        </div>
                                        <span className="text-success">
                                <i className="bi bi-arrow-up me-1 small"></i>8.30%
                            </span>
                                    </div>
                                    <div className="d-flex gap-4 align-items-center ms-auto mt-3 mt-lg-0">
                                        <select className="form-select">
                                            <optgroup label="2020">
                                                <option value="October">October</option>
                                                <option value="November">November</option>
                                                <option value="December">December</option>
                                            </optgroup>
                                            <optgroup label="2021">
                                                <option value="January">January</option>
                                                <option value="February">February</option>
                                                <option value="March">March</option>
                                                <option value="April">April</option>
                                                <option value="May" selected>May</option>
                                                <option value="June">June</option>
                                                <option value="July">July</option>
                                                <option value="August">August</option>
                                                <option value="September">September</option>
                                                <option value="October">October</option>
                                                <option value="November">November</option>
                                                <option value="December">December</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                                <div id="sales-chart"></div>
                                <div
                                    className="d-flex justify-content-center gap-4 align-items-center ms-auto mt-3 mt-lg-0">
                                    <div>
                                        <i className="bi bi-circle-fill mr-2 text-primary me-1 small"></i>
                                        <span>Sales</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-circle-fill mr-2 text-success me-1 small"></i>
                                        <span>Order</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="card widget h-100">
                            <div className="card-header d-flex">
                                <h6 className="card-title">
                                    Channels
                                    <a href="#" className="bi bi-question-circle ms-1 small" data-bs-toggle="tooltip"
                                       title="Channels where your products are sold"></a>
                                </h6>
                                <div className="d-flex gap-3 align-items-center ms-auto">
                                    <div className="dropdown">
                                        <a href="#" data-bs-toggle="dropdown" className="btn btn-sm"
                                           aria-haspopup="true"
                                           aria-expanded="false">
                                            <i className="bi bi-three-dots"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <a href="#" className="dropdown-item">View Detail</a>
                                            <a href="#" className="dropdown-item">Download</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div id="sales-channels"></div>
                                <div className="row text-center mb-5 mt-4">
                                    <div className="col-4">
                                        <div className="display-7">48%</div>
                                        <div className="text-success my-2 small">
                                            <i className="bi bi-arrow-up me-1 small"></i>30.50%
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <i className="bi bi-circle-fill text-orange me-2 small"></i>
                                            <span className="text-muted">Social Media</span>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="display-7">30%</div>
                                        <div className="text-danger my-2 small">
                                            <i className="bi bi-arrow-down me-1 small"></i>15.20%
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <i className="bi bi-circle-fill text-cyan me-2 small"></i>
                                            <span className="text-muted">Google</span>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="display-7">22%</div>
                                        <div className="text-success my-2 small">
                                            <i className="bi bi-arrow-up me-1 small"></i>1.80%
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <i className="bi bi-circle-fill text-indigo me-2 small"></i>
                                            <span className="text-muted">Email</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-outline-primary btn-icon">
                                        <i className="bi bi-download"></i> Download Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppContainerComponent>
        );
    }
 }

//For setting values on the state with redux
const mapDispatchToProps = dispatch => ({
    setRouteMountStatus: status => dispatch(setRouteMountStatus(status)),
    setCurrentRoute: route => dispatch(setCurrentRoute(route)),
    setResumeSavedRoute: () => dispatch(setResumeSavedRoute())
});

const mapStateToProps = createStructuredSelector({
    currentRoute: selectCurrentRoute,
    currentRouteMountStatus: selectCurrentRouteMountStatus,
    selectResumeSavedRoute: selectResumeSavedRoute,
});

 export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);