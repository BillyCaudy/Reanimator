import React from "react";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user).then(() => history.push("/chirps"));
  }

  handleDemo(e) {
    e.preventDefault();
    const { history } = this.props;
    const demoUser = {
      email: "heyhey@gmail.com",
      password: "heyhey"
    };
    this.props.login(demoUser).then(() => history.push("/chirps"));
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.props.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="auth-form-container">
        <h2>Login to Robin</h2>

        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
              className="auth-inputs"
            />
            <br />
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
              className="auth-inputs"
            />
            <br />
            <div className="auth-btn-container">
              <input type="submit" value="Submit" className="auth-btn" />
              <br />
              <button className="auth-btn" onClick={this.handleDemo}>
                Demo Instead
              </button>
            </div>
            <div className="errors">{this.renderErrors()}</div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
