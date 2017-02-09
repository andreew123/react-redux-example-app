import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';

import { fetchFinanceRecords } from '../../actions/FinanceActions';
import store from '../../store'
import s from '../css/styles.css';

export default class FinanceRecordList extends Component {
    componentWillMount() {
        store.dispatch(fetchFinanceRecords());
    }

    render() {
        const { isAuthenticated, finances } = this.props;
        let financeElements = [];

        if (finances.isFetching) {
            financeElements.push(
                <tr key='finances loading'>
                    <td>Lista betöltése...</td>
                </tr>
            );
        } else if (finances.error) {
            financeElements.push(
                <tr key='finances load error'>
                    <td>Hiba történt a lista betöltése közben!</td>
                </tr>
            );
        } else {
            Object.keys(finances.financeList).forEach((id) => {
                let date = finances.financeList[id].date;
                date = date.replace('T', ' ');
                date = date.replace('.000Z', '');
                financeElements.push(
                    <tr>
                        <td>{finances.financeList[id].recordId}</td>
                        <td>{date}</td>
                        <td>{finances.financeList[id].closingBalance} Ft</td>
                        <td>{finances.financeList[id].phoenixDebit} Ft</td>
                        <td>{finances.financeList[id].incomingOep} Ft</td>
                        <td>{finances.financeList[id].lastname}&nbsp;
                            {finances.financeList[id].firstname}</td>
                    </tr>
                );
            });
        }

        return (
            <div>
                { finances && isAuthenticated &&
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Dátum</th>
                                <th>Záróegyenleg</th>
                                <th>Phoenix tartozás</th>
                                <th>Beérkező OEP</th>
                                <th>Rögzítő neve</th>
                            </tr>
                        </thead>
                        <tbody>
                            {financeElements}
                        </tbody>
                    </Table>
                }
            </div>
        );
    }

}

FinanceRecordList.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    finances: PropTypes.object,
}
