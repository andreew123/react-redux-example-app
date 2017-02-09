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

export default class EditPasswordForm extends Component {
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
        let password = this.state.password,
            passwordAgain = this.state.passwordAgain;
        if (password === passwordAgain)
            this.props.onClickSave(password);
        else
            console.log('The two passwords are not match!');
    }

    render() {
        return (
            <div className="row">
                <Form onSubmit={this.handleOnClickSave} className="col-xs-12 col-md-6">
                  <div className="form-group col-md-6">
                    <FieldGroup
                        className="col-md-3"
                        id="formControlsTitle"
                        type="password"
                        name="password"
                        label="Jelszó"
                        placeholder="Írja be új jelszavát"
                        onChange={this.handleInputChange}
                    />
                    <FieldGroup
                        className="col-md-3"
                        id="formControlsTitle"
                        type="password"
                        name="passwordAgain"
                        label="Jelszó újra"
                        placeholder="Új jelszó mégegyszer"
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

EditPasswordForm.propTypes = {
    onClickSave: PropTypes.func.isRequired
};
