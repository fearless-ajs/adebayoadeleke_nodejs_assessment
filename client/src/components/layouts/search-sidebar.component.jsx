import React from "react";

const SearchSidebarComponent = () => {

    return (
        <div className="sidebar" id="search">
            <div className="sidebar-header">
                Search
                <button data-sidebar-close>
                    <i className="bi bi-arrow-right"></i>
                </button>
            </div>
            <div className="sidebar-content">
                <form className="mb-4">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search"
                               aria-describedby="button-search-addon" />
                            <button className="btn btn-outline-light" type="button" id="button-search-addon">
                                <i className="bi bi-search"></i>
                            </button>
                    </div>
                </form>
                <h6 className="mb-3">Last searched</h6>
                <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                        <a href="#" className="avatar avatar-sm me-3">
                        <span className="avatar-text rounded-circle">
                            <i className="bi bi-search"></i>
                        </span>
                        </a>
                        <a href="#" className="flex-fill">Reports for 2021</a>
                        <a href="#" className="btn text-danger btn-sm" data-bs-toggle="tooltip" title="Remove">
                            <i className="bi bi-x"></i>
                        </a>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <a href="#" className="avatar avatar-sm me-3">
                        <span className="avatar-text rounded-circle">
                            <i className="bi bi-search"></i>
                        </span>
                        </a>
                        <a href="#" className="flex-fill">Current users</a>
                        <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                            <i className="bi bi-x"></i>
                        </a>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <a href="#" className="avatar avatar-sm me-3">
                        <span className="avatar-text rounded-circle">
                            <i className="bi bi-search"></i>
                        </span>
                        </a>
                        <a href="#" className="flex-fill">Meeting notes</a>
                        <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                            <i className="bi bi-x"></i>
                        </a>
                    </div>
                </div>
                <h6 className="mb-3">Recently viewed</h6>
                <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                        <a href="#" className="avatar avatar-secondary avatar-sm me-3">
                        <span className="avatar-text rounded-circle">
                            <i className="bi bi-check-circle"></i>
                        </span>
                        </a>
                        <a href="#" className="flex-fill">Todo list</a>
                        <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                            <i className="bi bi-x"></i>
                        </a>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <a href="#" className="avatar avatar-warning avatar-sm me-3">
                        <span className="avatar-text rounded-circle">
                            <i className="bi bi-wallet2"></i>
                        </span>
                        </a>
                        <a href="#" className="flex-fill">Pricing table</a>
                        <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                            <i className="bi bi-x"></i>
                        </a>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <a href="#" className="avatar avatar-info avatar-sm me-3">
                        <span className="avatar-text rounded-circle">
                            <i className="bi bi-gear"></i>
                        </span>
                        </a>
                        <a href="#" className="flex-fill">Settings</a>
                        <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                            <i className="bi bi-x"></i>
                        </a>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <a href="#" className="avatar avatar-success avatar-sm me-3">
                        <span className="avatar-text rounded-circle">
                            <i className="bi bi-person-circle"></i>
                        </span>
                        </a>
                        <a href="#" className="flex-fill">Users</a>
                        <a href="#" className="btn" data-bs-toggle="tooltip" title="Remove">
                            <i className="bi bi-x"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="sidebar-action">
                <a href="#" className="btn btn-danger">All Clear</a>
            </div>
        </div>
    );
}

export default SearchSidebarComponent