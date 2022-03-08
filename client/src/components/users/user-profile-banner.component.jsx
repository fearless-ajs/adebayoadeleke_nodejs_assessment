import React from "react";
import AppContainerComponent from "../layouts/app-container.component";

const UserProfileBannerComponent = () => {

    return (
      <div>
          <div className="profile-cover bg-image mb-4" data-image="../../assets/images/profile-bg.jpg">
              <div className="container d-flex align-items-center justify-content-center h-100 flex-column flex-md-row text-center text-md-start">
                  <div className="avatar avatar-xl me-3">
                      <img src="../../assets/images/user/man_avatar3.jpg" className="rounded-circle"
                           alt="..." />
                  </div>
                  <div className="my-4 my-md-0">
                      <h3 className="mb-1">Timotheus Bendan</h3>
                      <small>Accountant</small>
                  </div>
                  <div className="ms-md-auto">
                      <a href="settings.html" className="btn btn-primary btn-lg btn-icon">
                          <i className="bi bi-pencil small"></i> Edit Profile
                      </a>
                  </div>
              </div>
          </div>

          <div className="row g-4">
              <div className="col-lg-7 col-md-12">
                  <ul className="nav nav-pills mb-4">
                      <li className="nav-item">
                          <a className="nav-link active" href="#">Products</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " href="#">Orders</a>
                      </li>
                  </ul>

              </div>
          </div>
      </div>
    );
}

export default UserProfileBannerComponent;