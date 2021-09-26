import React from 'react';
import { Link } from 'react-router-dom';
class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Link className="d-flex justify-content-center align-items-center" to="/">
                <h3>POKELIST</h3>
            </Link>
        );
    }
}

export default NavbarComp;