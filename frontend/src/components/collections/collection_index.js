// import React from 'react';
// import { withRouter } from 'react-router-dom';


// class CollectionIndex extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             collections: []
//         }
//     }

//     componentDidMount() {
//         this.props.getCollections();
//     }


//     render() {
//         let collections = this.state.collections;
//         if (this.state.collections.length === 0) {
//             return (<div>Upload and Image to Create a Collection!</div>)
//         } else {
//             return (
//                 <div>
//                     <h2>Popular Time-Lapses</h2>
//                     {collections}
//                 </div>
//             );
//         }
//     }
// }

// export default withRouter(CollectionIndex);