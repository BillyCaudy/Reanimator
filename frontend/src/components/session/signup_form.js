import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.signedIn === true) {
    //         this.props.history.push('/login');
    //     }

    //     this.setState({ errors: nextProps.errors })
    // }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.signup(user).then(this.props.login(user));
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="session-form">
                        <br />
                        <input type="text"
                            value={this.state.name}
                            onChange={this.update('name')}
                            placeholder="Name"
                        />
                        <br />
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            placeholder="Confirm Password"
                        />
                        <br />
                        <input className="session-button" type="submit" value="Finish Signup" />
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm);