import React, { Component, PropTypes } from 'react';
import s from '../css/styles.css';
import { FormGroup, ControlLabel, FormControl, Form, Button } from 'react-bootstrap';

function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

export default class NewUserForm extends Component {
    constructor(props){
        super(props);
        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnClickSave = this.handleOnClickSave.bind(this);
    }

    handleInputChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleOnClickSave(event) {
        event.preventDefault();
        if (!this.state.roleId || this.state.roleId !== 'select')
            this.state.roleId = 1;
        let data = { lastname: this.state.lastname,
            firstname: this.state.firstname,
            email: this.state.email,
            password: this.state.password,
            birthday: this.state.birthday,
            phone: this.state.phone,
            title: this.state.title,
            roleId: this.state.roleId };
        this.props.onClickSave(data);
    }

    render() {
        return (
            <div>
                <h1>Új cég/patika</h1>
                <hr/>
                <div className="row">
                    <Form onSubmit={this.handleOnClickSave} className="col-xs-12 col-md-6">
                        <div className="form-group col-md-6">
                            <FieldGroup
                                className="col-md-3"
                                id="formControlsLastname"
                                type="text"
                                name="lastname"
                                label="Vezetéknév"
                                placeholder="Írja be a vezetéknevet"
                                onChange={this.handleInputChange}
                                />
                            <FieldGroup
                                className="col-md-3"
                                id="formControlsEmail"
                                type="email"
                                name="email"
                                label="Email cím"
                                placeholder="Írja be az email címet"
                                onChange={this.handleInputChange}
                                />
                        </div>
                        <div className="form-group col-md-6">
                            <FieldGroup
                                className="col-md-3"
                                id="formControlsFirstname"
                                type="text"
                                name="firstname"
                                label="Keresztnév"
                                placeholder="Írja be a keresztnevet"
                                onChange={this.handleInputChange}
                                />
                            <FieldGroup
                                className="col-md-3"
                                id="formControlsPassword"
                                type="text"
                                name="password"
                                label="Jelszó"
                                placeholder="Írja be a jelszavat"
                                onChange={this.handleInputChange}
                                />
                        </div>
                        <div className="form-group col-md-6">
                            <FieldGroup
                                id="formControlsBirthday"
                                type="text"
                                name="birthday"
                                label="Születési idő"
                                placeholder="1970-01-01"
                                onChange={this.handleInputChange}
                                />
                            <FieldGroup
                                id="formControlsPhone"
                                type="text"
                                name="phone"
                                label="Telefonszám"
                                placeholder="+36101112223"
                                onChange={this.handleInputChange}
                                />
                        </div>
                        <div className="form-group col-md-6">
                            <FieldGroup
                                id="formControlsTitle"
                                type="text"
                                name="title"
                                label="Pozíció"
                                placeholder="Írja be a pozíciót"
                                onChange={this.handleInputChange}
                                />
                            <FormGroup controlId="formControlsRole" onChange={this.handleInputChange}>
                                <ControlLabel>Jogosultság</ControlLabel>
                                <FormControl componentClass="select"
                                    placeholder="válasszon" name="roleId">
                                    <option value="select">Válasszon</option>
                                    <option value="1">Szuperadmin</option>
                                    <option value="2">Admin</option>
                                    <option value="3">Tulajdonos</option>
                                    <option value="4">Alkalmazott</option>
                                </FormControl>
                            </FormGroup>
                        </div>
                        <div className="form-group col-md-12">
                            <Button type="submit" onClick={this.handleOnClickSave}>
                                Mentés
                            </Button>
                        </div>
                    </Form>
                </div>
                <hr/>
            </div>
        );
    }

}

NewUserForm.propTypes = {
    onClickSave: PropTypes.func.isRequired
};
