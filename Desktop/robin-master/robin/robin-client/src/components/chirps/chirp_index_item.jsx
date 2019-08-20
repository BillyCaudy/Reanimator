import React from "react";

class ChirpIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   console.log(this.props.chirp);
  // }

  render() {
    const chirp = this.props.chirp.body;
    return (
      <div>
        <ul className="chirp-item-container">
          <div>Chirper: Anonymous</div>
          <div>{chirp}</div>
          <div>Date:</div>
        </ul>
      </div>
    );
  }
}
export default ChirpIndexItem;
