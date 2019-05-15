import React from 'react';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: []
        }
    }

    // componentDidMount(){
    //     return this.props.getUserCollections(this.props.match.params.id);
    // }
    render() {
    
            return (
                <div id="profile-memories">
                    <div>Hi {this.props.currentUser.name}!</div>
                    <img src="profile-pic.jpg" id="profile-pic"/> 
                  <h1>Memories</h1>
                </div>
            );
        }
    }
export default ProfilePage;