import React from "react";

const SettingsSidebarComponent = () => {

    return (
        <div className="sidebar" id="settings">
            <div className="sidebar-header">
                <div>
                    <i className="bi bi-gear me-2"></i>
                    Settings
                </div>
                <button data-sidebar-close>
                    <i className="bi bi-arrow-right"></i>
                </button>
            </div>
            <div className="sidebar-content">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0 border-0">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" checked />
                                <label className="form-check-label" htmlFor="flexCheckDefault1">
                                    Remember next visits
                                </label>
                        </div>
                    </li>
                    <li className="list-group-item px-0 border-0">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" checked />
                                <label className="form-check-label" htmlFor="flexCheckDefault2">
                                    Enable report generation.
                                </label>
                        </div>
                    </li>
                    <li className="list-group-item px-0 border-0">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault3" checked />
                                <label className="form-check-label" htmlFor="flexCheckDefault3">
                                    Allow notifications.
                                </label>
                        </div>
                    </li>
                    <li className="list-group-item px-0 border-0">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault4" />
                                <label className="form-check-label" htmlFor="flexCheckDefault4">
                                    Hide user requests
                                </label>
                        </div>
                    </li>
                    <li className="list-group-item px-0 border-0">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault5" checked />
                                <label className="form-check-label" htmlFor="flexCheckDefault5">
                                    Speed up demands
                                </label>
                        </div>
                    </li>
                    <li className="list-group-item px-0 border-0">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Hide menus
                                </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="sidebar-action">
                <a href="#" className="btn btn-primary">All Settings</a>
            </div>
        </div>
    );
}

export default SettingsSidebarComponent;