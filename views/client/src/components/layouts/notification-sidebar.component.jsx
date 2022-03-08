import React from 'react';

const NotificationSidebarComponent = () => {

    return (
        <div className="sidebar" id="notifications">
            <div className="sidebar-header d-block align-items-end">
                <div className="align-items-center d-flex justify-content-between py-4">
                    Notifications
                    <button data-sidebar-close>
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link active nav-link-notify" data-bs-toggle="tab"
                           href="#activities">Activities</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#notes">Notes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#alerts">Alerts</a>
                    </li>
                </ul>
            </div>
            <div className="sidebar-content">
                <div className="tab-content">
                    <div className="tab-pane active" id="activities">
                        <div className="tab-pane-body">
                            <ul className="list-group list-group-flush">
                                <li className="px-0 list-group-item">
                                    <a href="#" className="d-flex">
                                        <div className="flex-shrink-0">
                                            <figure className="avatar avatar-info me-3">
                                            <span className="avatar-text rounded-circle">
                                                <i className="bi bi-person"></i>
                                            </span>
                                            </figure>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-0 fw-bold d-flex justify-content-between">
                                                You joined a group
                                            </p>
                                            <span className="text-muted small">
                                        <i className="bi bi-clock me-1"></i> Today
                                    </span>
                                        </div>
                                    </a>
                                </li>
                                <li className="px-0 list-group-item">
                                    <a href="#" className="d-flex">
                                        <div className="flex-shrink-0">
                                            <figure className="avatar avatar-warning me-3">
                                            <span className="avatar-text rounded-circle">
                                                <i className="bi bi-hdd"></i>
                                            </span>
                                            </figure>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-0 fw-bold d-flex justify-content-between">
                                                Storage is running low!
                                            </p>
                                            <span className="text-muted small">
                                        <i className="bi bi-clock me-1"></i> Today
                                    </span>
                                        </div>
                                    </a>
                                </li>
                                <li className="px-0 list-group-item">
                                    <a href="#" className="d-flex">
                                        <div className="flex-shrink-0">
                                            <figure className="avatar avatar-secondary me-3">
                                            <span
                                                className="avatar-text rounded-circle">
                                                <i className="bi bi-file-text"></i>
                                            </span>
                                            </figure>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-0 d-flex justify-content-between">
                                                1 person sent a file
                                            </p>
                                            <span className="text-muted small">
                                        <i className="bi bi-clock me-1"></i> Yesterday
                                    </span>
                                        </div>
                                    </a>
                                </li>
                                <li className="px-0 list-group-item">
                                    <a href="#" className="d-flex">
                                        <div className="flex-shrink-0">
                                            <figure className="avatar avatar-success me-3">
                                            <span className="avatar-text rounded-circle">
                                                <i className="bi bi-download"></i>
                                            </span>
                                            </figure>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-0 d-flex justify-content-between">
                                                Reports ready to download
                                            </p>
                                            <span className="text-muted small">
                                        <i className="bi bi-clock me-1"></i> Yesterday
                                    </span>
                                        </div>
                                    </a>
                                </li>
                                <li className="px-0 list-group-item">
                                    <a href="#" className="d-flex">
                                        <div className="flex-shrink-0">
                                            <figure className="avatar avatar-info me-3">
                                            <span className="avatar-text rounded-circle">
                                                <i className="bi bi-lock"></i>
                                            </span>
                                            </figure>
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-0 d-flex justify-content-between">
                                                2 steps verification
                                            </p>
                                            <span className="text-muted small">
                                        <i className="bi bi-clock me-1"></i> 20 min ago
                                    </span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-pane-footer">
                            <a href="#" className="btn btn-success">
                                <i className="bi bi-check2 me-2"></i> Make All Read
                            </a>
                            <a href="#" className="btn btn-danger ms-2">
                                <i className="bi bi-trash me-2"></i> Delete all
                            </a>
                        </div>
                    </div>
                    <div className="tab-pane" id="notes">
                        <div className="tab-pane-body">
                            <ul className="list-group list-group-flush">
                                <li className="px-0 list-group-item">
                                    <p className="mb-0 fw-bold text-success d-flex justify-content-between">
                                        This month's report will be prepared.
                                    </p>
                                    <span className="text-muted small">
                                <i className="bi bi-clock me-1"></i> Today
                            </span>
                                    <div className="mt-2">
                                        <a href="#">Edit</a>
                                        <a href="#" className="text-danger ms-2">Delete</a>
                                    </div>
                                </li>
                                <li className="px-0 list-group-item">
                                    <p className="mb-0 fw-bold text-success d-flex justify-content-between">
                                        An email will be sent to the customer.
                                    </p>
                                    <span className="text-muted small">
                                <i className="bi bi-clock me-1"></i> Today
                            </span>
                                    <div className="mt-2">
                                        <a href="#">Edit</a>
                                        <a href="#" className="text-danger ms-2">Delete</a>
                                    </div>
                                </li>
                                <li className="px-0 list-group-item">
                                    <p className="mb-0 d-flex justify-content-between">
                                        The meeting will be held.
                                    </p>
                                    <span className="text-muted small">
                                <i className="bi bi-clock me-1"></i> Yesterday
                            </span>
                                    <div className="mt-2">
                                        <a href="#">Edit</a>
                                        <a href="#" className="text-danger ms-2">Delete</a>
                                    </div>
                                </li>
                                <li className="px-0 list-group-item">
                                    <p className="mb-0 fw-bold text-success d-flex justify-content-between">
                                        Conversation with users.
                                    </p>
                                    <span className="text-muted small">
                                <i className="bi bi-clock me-1"></i> Yesterday
                            </span>
                                    <div className="mt-2">
                                        <a href="#">Edit</a>
                                        <a href="#" className="text-danger ms-2">Delete</a>
                                    </div>
                                </li>
                                <li className="px-0 list-group-item">
                                    <p className="mb-0 fw-bold text-warning d-flex justify-content-between">
                                        Payment refund will be made to the customer.
                                    </p>
                                    <span className="text-muted small">
                                <i className="bi bi-clock me-1"></i> 20 min ago
                            </span>
                                    <div className="mt-2">
                                        <a href="#">Edit</a>
                                        <a href="#" className="text-danger ms-2">Delete</a>
                                    </div>
                                </li>
                                <li className="px-0 list-group-item">
                                    <p className="mb-0 d-flex justify-content-between">
                                        Payment form will be activated.
                                    </p>
                                    <span className="text-muted small">
                                <i className="bi bi-clock me-1"></i> 20 min ago
                            </span>
                                    <div className="mt-2">
                                        <a href="#">Edit</a>
                                        <a href="#" className="text-danger ms-2">Delete</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-pane-footer">
                            <a href="#" className="btn btn-primary btn-block">
                                <i className="bi bi-plus me-2"></i> Add Notes
                            </a>
                        </div>
                    </div>
                    <div className="tab-pane" id="alerts">
                        <div className="tab-pane-body">
                            <ul className="list-group list-group-flush">
                                <li className="px-0 list-group-item d-flex">
                                    <div className="flex-shrink-0">
                                        <figure className="avatar avatar-warning me-3">
                                        <span className="avatar-text rounded-circle">
                                            <i className="bi bi-lock"></i>
                                        </span>
                                        </figure>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0 fw-bold d-flex justify-content-between">
                                            Signed in with a different device.
                                        </p>
                                        <span className="text-muted small">
                                        <i className="bi bi-clock me-1"></i> Yesterday
                                    </span>
                                    </div>
                                </li>
                                <li className="px-0 list-group-item d-flex">
                                    <div className="flex-shrink-0">
                                        <figure className="avatar avatar-warning me-3">
                                        <span className="avatar-text fw-bold rounded-circle">
                                            <i className="bi bi-file-text"></i>
                                        </span>
                                        </figure>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0 fw-bold d-flex justify-content-between">
                                            Your billing information is not active.
                                        </p>
                                        <span className="text-muted small">
                                        <i className="bi bi-clock me-1"></i> Yesterday
                                    </span>
                                    </div>
                                </li>
                                <li className="px-0 list-group-item d-flex">
                                    <div className="flex-shrink-0">
                                        <figure className="avatar avatar-warning me-3">
                                        <span className="avatar-text rounded-circle">
                                            <i className="bi bi-person"></i>
                                        </span>
                                        </figure>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0 d-flex justify-content-between">
                                            Your subscription has expired.
                                        </p>
                                        <span className="text-muted small">
                                        <i className="bi bi-clock me-1"></i> Today
                                    </span>
                                    </div>
                                </li>
                                <li className="px-0 list-group-item d-flex">
                                    <div className="flex-shrink-0">
                                        <figure className="avatar avatar-warning me-3">
                                        <span className="avatar-text rounded-circle">
                                            <i className="bi bi-hdd"></i>
                                        </span>
                                        </figure>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0 d-flex justify-content-between">
                                            Your storage space is running low
                                        </p>
                                        <span className="text-muted small">
                                        <i className="bi bi-clock me-1"></i> Today
                                    </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-pane-footer">
                            <a href="#" className="btn btn-success">
                                <i className="bi bi-check2 me-2"></i> Make All Read
                            </a>
                            <a href="#" className="btn btn-danger ms-2">
                                <i className="bi bi-trash me-2"></i> Delete all
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationSidebarComponent;