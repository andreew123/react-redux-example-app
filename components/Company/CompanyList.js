import React, { Component, PropTypes } from 'react'
import { Table } from 'react-bootstrap';
import { fetchCompanies } from '../../actions/CompanyActions'
import store from '../../store'

export default class CompanyList extends Component {
    componentWillMount() {
        store.dispatch(fetchCompanies());
    }

    render() {
        const { companies } = this.props
        let companyElements = [];

        if (companies.isFetching) {
            companyElements.push(
                <tr key='companies loading'>
                    <td>Lista betöltése...</td>
                </tr>
            );
        } else if (companies.error) {
            companyElements.push(
                <tr key='companies load error'>
                    <td>Hiba történt a lista betöltése közben!</td>
                </tr>
            );
        } else {
            Object.keys(companies.companyList).forEach((id) => {
                companyElements.push(
                    <tr key={companies.companyList[id].companyId}>
                        <td>{companies.companyList[id].companyId}</td>
                        <td>{companies.companyList[id].companyName}</td>
                        <td>{companies.companyList[id].taxNumber}</td>
                        <td>{companies.companyList[id].recordNumber}</td>
                        <td>{companies.companyList[id].phone}</td>
                        <td>{companies.companyList[id].seat}</td>
                    </tr>
                );
            });
        }

        return (
            <div>
                { companies &&
                    <div>
                        <h1>Cégek listája</h1>
                        <hr/>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Cégnév</th>
                                        <th>Adószám</th>
                                        <th>Jegyzékszám</th>
                                        <th>Telefonszám</th>
                                        <th>Székhely</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companyElements}
                                </tbody>
                            </Table>
                        <hr/>
                    </div>
                }
            </div>
        )
    }
}

CompanyList.propTypes = {
    companies: PropTypes.object
}
