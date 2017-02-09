import React, { Component, PropTypes } from 'react'
import { Table } from 'react-bootstrap';

import { fetchUsers } from '../../actions/UserActions'
import store from '../../store'

export default class UserList extends Component {
    componentWillMount() {
        store.dispatch(fetchUsers());
    }

    render() {
        const { isAuthenticated, users } = this.props
        let userElements = [];

        if (users.isFetching) {
            userElements.push(
                <tr key='users loading'>
                    <td>Lista betöltése...</td>
                </tr>
            );
        } else if (users.error) {
            userElements.push(
                <tr key='users load error'>
                    <td>Hiba történt a lista betöltése közben!</td>
                </tr>
            );
        } else {
            Object.keys(users.userList).forEach((id) => {
                let birthday = users.userList[id].birthday;
                    birthday = birthday.indexOf('T') !== -1 ?
                                birthday.split('T')[0] : 'Nincs megadva';
                userElements.push(
                    <tr key={users.userList[id].userId}>
                        <td>{users.userList[id].userId}</td>
                        <td>{users.userList[id].lastname}</td>
                        <td>{users.userList[id].firstname}</td>
                        <td>{users.userList[id].email}</td>
                        <td>{users.userList[id].phone}</td>
                        <td>{birthday}</td>
                        <td>{users.userList[id].title}</td>
                        <td>{users.userList[id].role}</td>
                    </tr>
                );
            });
        }

        return (
            <div>
                { users && isAuthenticated &&
                    <div>
                        <h1>Felhasználók listája</h1>
                        <hr/>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Vezetéknév</th>
                                        <th>Keresztnév</th>
                                        <th>Email</th>
                                        <th>Telefonszám</th>
                                        <th>Születés dátuma</th>
                                        <th>Pozíció</th>
                                        <th>Jogosultság</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userElements}
                                </tbody>
                            </Table>
                        <hr/>
                    </div>
                }
            </div>
        );
    }
}

UserList.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    users: PropTypes.object,
}
