import React from 'react';
import SettingsSidebarComponent from "./settings-sidebar.component";
import AppLayoutComponent from "./app-layout.component";
import NotificationSidebarComponent from "./notification-sidebar.component";
import SearchSidebarComponent from "./search-sidebar.component";
import MenuComponent from "./menu.component";


const AppContainerComponent = ({ children }) => {

    return (
        <div>
            <NotificationSidebarComponent />
            <SettingsSidebarComponent />
            <SearchSidebarComponent />
            <MenuComponent />
            <AppLayoutComponent>
                {children}
            </AppLayoutComponent>
        </div>
    );

}
export default AppContainerComponent;