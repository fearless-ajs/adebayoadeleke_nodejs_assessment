import React from 'react';
import FooterComponent from "./footer.component";
import HeaderComponent from "./header.component";

const AppLayoutComponent = ({ children }) => {

    return (
            <div className="layout-wrapper">
                <HeaderComponent />
                <div className="content ">
                    {children}
                </div>
                <FooterComponent />
            </div>
    );

}
export default AppLayoutComponent;