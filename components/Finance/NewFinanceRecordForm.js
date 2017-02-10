import React, { Component, PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Form, Button } from 'react-bootstrap';
import s from '../css/styles.css';

function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

export default class NewFinanceRecordForm extends Component {
    constructor(props){
        super(props);
        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnClickSave = this.handleOnClickSave.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleOnClickSave(event) {
        event.preventDefault();
        let data = { companyId: this.state.companyId,
            closingBalance: this.state.closingBalance,
            phoenixDebit: this.state.phoenixDebit,
            incomingOep: this.state.incomingOep };
        this.props.onClickSave(data);
    }

    render() {
        return (
            <div>
                <h1>Új egyenleg</h1>
                <hr/>
                <div className="row">
                    <Form onSubmit={this.handleOnClickSave} className="col-xs-12 col-md-4">
                        <FieldGroup
                            id="formControlsClosingBalance"
                            type="number"
                            name="closingBalance"
                            label="Záróegyenleg"
                            onChange={this.handleInputChange}
                        />
                        <FieldGroup
                            id="formControlsPhoenixDebit"
                            type="number"
                            name="phoenixDebit"
                            label="Phoenix tartozás"
                            onChange={this.handleInputChange}
                        />
                        <FieldGroup
                            id="formControlsIncomingOep"
                            type="number"
                            name="incomingOep"
                            label="Beérkező OEP"
                            onChange={this.handleInputChange}
                        />
                        <FormGroup controlId="formControlsCompany" onChange={this.handleInputChange}>
                            <ControlLabel>Patika/Cég</ControlLabel>
                            <FormControl componentClass="select"
                                placeholder="válasszon" name="companyId">
                                <option value="select">Válasszon</option>
                                <option value="1">Mosoly Patikák Kft</option>
                                <option value="2">Partner Patika</option>
                            </FormControl>
                        </FormGroup>
                        <Button type="submit" bsSize="large" onClick={this.handleOnClickSave}>
                            Mentés
                        </Button>
                    </Form>
                </div>
                <hr/>
            </div>
        );
    }

}

NewFinanceRecordForm.propTypes = {
    onClickSave: PropTypes.func.isRequired
};
