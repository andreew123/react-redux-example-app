import React, { Component, PropTypes } from 'react';
import s from '../css/styles.css';
import { FormGroup, ControlLabel, FormControl, Form, Button, Col } from 'react-bootstrap';

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnClickLogin = this.handleOnClickLogin.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleOnClickLogin(event) {
        event.preventDefault();
        let creds = { email: this.state.email,
            password: this.state.password };
        console.log('creds', creds);
        this.props.onLoginClick(creds);
    }

    render() {
        const { errorMessage } = this.props

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-md-8 col-md-offset-4">
                        <h1>Bejelentkezés</h1>
                        <hr/>
                    </div>
                    <Form onSubmit={this.handleOnClickLogin} horizontal className="col-xs-12 col-md-8 col-md-offset-2">
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={4}>
                                Email cím
                            </Col>
                            <Col sm={8}>
                                <FormControl type="email" placeholder="Írja be az email címét"
                                    name="email" onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={4}>
                                Jelszó
                            </Col>
                            <Col sm={8}>
                                <FormControl type="password" placeholder="Írja be jelszavát"
                                    name="password" onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={4} sm={8}>
                                <Button type="submit" onClick={this.handleOnClickLogin}
                                    bsStyle="primary">
                                    Bejelentkezés
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>

                    {errorMessage &&
                      <p style={{color:'red'}}>{errorMessage}</p>
                    }

                </div>
                <hr/>
            </div>
        );
    }

}

LoginForm.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};
