import React from "react";

const UserProfileSwitchComponent = () => {


    return (
        <div className="col-md-4">
            <div className="card sticky-top mb-4 mb-md-0">
                <div className="card-body">
                    <ul className="nav nav-pills flex-column gap-2" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active" id="profile-tab" data-bs-toggle="tab" href="#profile"
                               role="tab"
                               aria-controls="profile" aria-selected="true">
                                <i className="bi bi-person me-2"></i> Profile
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="buyer-profile-tab" data-bs-toggle="tab"
                               href="#buyer-profile"
                               role="tab"
                               aria-controls="buyer-profile" aria-selected="false">
                                <i className="bi bi-person me-2"></i> Buyer profile
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="business-profile-tab" data-bs-toggle="tab"
                               href="#business-profile"
                               role="tab"
                               aria-controls="business-profile" aria-selected="false">
                                <i className="bi bi-person me-2"></i> Business profile
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="password-tab" data-bs-toggle="tab" href="#password"
                               role="tab"
                               aria-controls="password" aria-selected="false">
                                <i className="bi bi-lock me-2"></i> Password
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="operations-tab" data-bs-toggle="tab"
                               href="#operations"
                               role="tab"
                               aria-controls="operations" aria-selected="false">
                                <i className="bi bi-gear me-2"></i> Operations
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserProfileSwitchComponent;