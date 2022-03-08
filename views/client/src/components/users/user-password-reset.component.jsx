import React from "react";

const UserPasswordResetComponent = () => {


    return (
        <div className="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title mb-4">Change Password</h6>
                    <div className="mb-3">
                        <label className="form-label">Old Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password Repeat</label>
                        <input type="password" className="form-control" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPasswordResetComponent;