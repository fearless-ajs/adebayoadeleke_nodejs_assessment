import React from 'react';

const HeaderComponent = () => {
    return (
        <div className="header">
            <div className="menu-toggle-btn">
                {/*Menu close button for mobile devices*/}
                <a href="#">
                    <i className="bi bi-list"></i>
                </a>
            </div>

            <a href="index-2.html" className="logo">
                <img width="100" src="https://vetra.laborasyon.com/assets/images/logo.svg" alt="logo" />
            </a>

            <div className="page-title">Overview</div>
            <form className="search-form">
                <div className="input-group">
                    <button className="btn btn-outline-light" type="button" id="button-addon1">
                        <i className="bi bi-search"></i>
                    </button>
                    <input type="text" className="form-control" placeholder="Search..."
                           aria-label="Example text with button addon" aria-describedby="button-addon1" />
                        <a href="#" className="btn btn-outline-light close-header-search-bar">
                            <i className="bi bi-x"></i>
                        </a>
                </div>
            </form>
            <div className="header-bar ms-auto">
                <ul className="navbar-nav justify-content-end">
                    <li className="nav-item">
                        <a href="#" className="nav-link nav-link-notify" data-count="2"
                           data-sidebar-target="#notifications">
                            <i className="bi bi-bell icon-lg"></i>
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a href="#" className="nav-link nav-link-notify" data-count="3" data-bs-toggle="dropdown">
                            <i className="bi bi-cart2 icon-lg"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
                            <h6 className="m-0 px-4 py-3 border-bottom">Shopping Cart</h6>
                            <div className="dropdown-menu-body">
                                <div className="list-group list-group-flush">
                                    <div className="list-group-item d-flex align-items-center">
                                        <a href="#" className="text-danger me-3" title="Remove">
                                            <i className="bi bi-trash"></i>
                                        </a>
                                        <a href="#" className="me-3 flex-shrink-0 ">
                                            <img src="../../assets/images/products/3.jpg" className="rounded" width="60"
                                                 alt="..." />
                                        </a>
                                        <div>
                                            <h6>Digital clock</h6>
                                            <div>1 x $1.190,90</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-group list-group-flush">
                                    <div className="list-group-item d-flex align-items-center">
                                        <a href="#" className="text-danger me-3" title="Remove">
                                            <i className="bi bi-trash"></i>
                                        </a>
                                        <a href="#" className="me-3 flex-shrink-0 ">
                                            <img src="../../assets/images/products/4.jpg" className="rounded" width="60"
                                                 alt="..." />
                                        </a>
                                        <div>
                                            <h6>Toy Car</h6>
                                            <div>1 x $139.58</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-group list-group-flush">
                                    <div className="list-group-item d-flex align-items-center">
                                        <a href="#" className="text-danger me-3" title="Remove">
                                            <i className="bi bi-trash"></i>
                                        </a>
                                        <a href="#" className="me-3 flex-shrink-0 ">
                                            <img src="../../assets/images/products/5.jpg" className="rounded" width="60"
                                                 alt="..." />
                                        </a>
                                        <div>
                                            <h6>Sunglasses</h6>
                                            <div>2 x $50,90</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-group list-group-flush">
                                    <div className="list-group-item d-flex align-items-center">
                                        <a href="#" className="text-danger me-3" title="Remove">
                                            <i className="bi bi-trash"></i>
                                        </a>
                                        <a href="#" className="me-3 flex-shrink-0 ">
                                            <img src="../../assets/images/products/6.jpg" className="rounded" width="60"
                                                 alt="..." />
                                        </a>
                                        <div>
                                            <h6>Cake</h6>
                                            <div>1 x $10,50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h6 className="m-0 px-4 py-3 border-top small">Sub Total : <strong
                                className="text-primary">$1.442,78</strong></h6>
                        </div>
                    </li>
                    <li className="nav-item ms-3">
                        <button className="btn btn-primary btn-icon">
                            <i className="bi bi-plus-circle"></i> Add Product
                        </button>
                    </li>
                </ul>
            </div>
                 {/*Header mobile buttons */}
            <div className="header-mobile-buttons">
                <a href="#" className="search-bar-btn">
                    <i className="bi bi-search"></i>
                </a>
                <a href="#" className="actions-btn">
                    <i className="bi bi-three-dots"></i>
                </a>
            </div>

        </div>
    );
}
export default HeaderComponent;