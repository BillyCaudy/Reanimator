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
                <div>
                  <h1>Memories</h1>
                </div>
            );
        }
    }
export default ProfilePage;