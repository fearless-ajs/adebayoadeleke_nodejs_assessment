import React from "react";
import {ArrowRight} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const SideBarMenuLinkComponent = ({ link, classIcon, title, status, arrow }) => {

    return (
        <li>
            <Link className={`${status}`}
               to={link}>
                    <span className="nav-link-icon">
                        <i className={classIcon}></i>
                    </span>
                <span>{title} {arrow?<ArrowRight className="ml-4" />:null}</span>
            </Link>
        </li>
    );
}

export default SideBarMenuLinkComponent;