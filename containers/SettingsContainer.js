import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import UserList from '../components/User/UserList'
import NewUserForm from '../components/User/NewUserForm'
import { saveUser } from '../actions/UserActions'
import { logoutUser } from '../actions/LogoutActions'

class SettingsContainer extends Component {

    render() {
        const { dispatch, users, isAuthenticated, errorMessage } = this.props
        return (
            <div>
                <Navbar
                  isAuthenticated={isAuthenticated}
                  dispatch={dispatch}
                  onLogoutClick={() => dispatch(logoutUser())}
                />
                <div>
                    <UserList
                        isAuthenticated={isAuthenticated}
                        users={users}
                    />
                </div>
                <div>
                    <NewUserForm
                        onClickSave={ data => dispatch(saveUser(data)) }
                        isAuthenticated={isAuthenticated}
                        errorMessage={errorMessage}
                        dispatch={dispatch}
                    />
                </div>
            </div>
        )
    }
}

SettingsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}

function mapStateToProps(state) {
  const { users, auth } = state
  const { userList, authenticated } = users
  const { isAuthenticated, errorMessage } = auth

  return {
    users,
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(SettingsContainer)
