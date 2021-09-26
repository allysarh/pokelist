import React from 'react';
import { Link } from 'react-router-dom';
import pokeBall from '../assets/images/pokeball_icon.png'

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Link className="d-flex justify-content-center align-items-center" to="/" style={{ textDecoration: 'none', color: 'black' }}>
                <img src={pokeBall} style={{ height: '30px' }} />
                <h3>POKELIST</h3>
                <img src={pokeBall} style={{ height: '30px' }} />
            </Link>
        );
    }
}

export default NavbarComp;