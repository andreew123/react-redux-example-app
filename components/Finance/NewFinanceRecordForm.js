import React, { Component, PropTypes } from 'react';
import s from '../css/styles.css';

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
        let data = { closingBalance: this.state.closingBalance,
            phoenixDebit: this.state.phoenixDebit,
            incomingOep: this.state.incomingOep };
        this.props.onClickSave(data);
    }

    render() {
        const { isAuthenticated, errorMessage } = this.props;

        return (
            <div>
                <form onSubmit={this.handleOnClickSave}>
                    <input type='text' label='Záróegyenleg' name='closingBalance'
                    onChange={this.handleInputChange}/>
                    <input type='text' label='Phoenix tartozás' name='phoenixDebit'
                    onChange={this.handleInputChange}/>
                    <input type='text' label='Beérkező OEP' name='incomingOep'
                    onChange={this.handleInputChange}/>
                    <span className={`fa fa-search`} onClick={this.handleOnClickSave}></span>
                </form>
            </div>
        );
    }

}

NewFinanceRecordForm.propTypes = {
    onClickSave: PropTypes.func.isRequired
};
