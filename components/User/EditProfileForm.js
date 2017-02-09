import React, { Component, PropTypes } from 'react';
import s from '../../pages/home/styles.css';
import { FormGroup, ControlLabel, FormControl, Form, Button } from 'react-bootstrap';

function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

export default class EditProfileForm extends Component {
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
        let lastname = this.state.lastname,
            firstname = this.state.firstname,
            birthday = this.state.birthday,
            phone = this.state.phone,
            title = this.state.title;
        this.props.onClickSave(lastname, firstname, birthday, phone, title);
    }

    render() {
        return (
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
                        id="formControlsBirthday"
                        type="text"
                        name="birthday"
                        label="Születési idő"
                        placeholder="1970-01-01"
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
                  </div>
                  <div className="form-group col-md-12">
                    <Button type="submit" onClick={this.handleOnClickSave}>
                        Mentés
                    </Button>
                  </div>
                </Form>
            </div>
        );
    }

}

EditProfileForm.propTypes = {
    onClickSave: PropTypes.func.isRequired
};
