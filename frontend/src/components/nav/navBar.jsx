import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    {/* <Link to={'/Links'}>All Links</Link> */}
                    <div>
                        <Link to={'/profile-page'}>Profile</Link>
                    </div>
                    <button onClick={this.logoutUser}>Logout</button>
                    
                </div>
            );
        } else {
            return (
                <div>
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Link to='/' className='logo'><h1>Reanimation</h1></Link>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;