import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import Header from '../components/Header'
import UserList from '../components/User/UserList'
import NewUserForm from '../components/User/NewUserForm'
import CompanyList from '../components/Company/CompanyList'
import NewCompanyForm from '../components/Company/NewCompanyForm'
import { saveUser } from '../actions/UserActions'
import { logoutUser } from '../actions/LogoutActions'
import { changeViewState } from '../actions/SettingsActions'
import s from '../components/css/styles.css';

class SettingsPageButton extends Component {
    render() {
        let { viewState, onStateClick } = this.props
        let currentView = viewState == 'user' ? 'company' : 'user'
        let buttonName = viewState == 'user' ? 'Cégek' : 'Felhasználók'

        return (
            <Button
                bsStyle="primary pull-right" bsSize="large"
                onClick={() => onStateClick(currentView)}>
                    {buttonName}
            </Button>
        )
    }
}

SettingsPageButton.propTypes = {
  viewState: PropTypes.string,
  onStateClick: PropTypes.func.isRequired
}

class SettingsContainer extends Component {

    render() {
        const { dispatch, users, companies, viewState, isAuthenticated, errorMessage } = this.props

        return (
            <div>
                {isAuthenticated &&
                    <Header
                      isAuthenticated={isAuthenticated}
                      dispatch={dispatch}
                      onLogoutClick={() => dispatch(logoutUser())}
                    />
                }
                <div className={s.contentWider}>
                    {isAuthenticated &&
                        <div>
                            <SettingsPageButton
                                onStateClick={(viewState) => dispatch(changeViewState(viewState))}
                                viewState={viewState}
                                />
                        </div>
                    }
                    {viewState === 'user' && isAuthenticated &&
                        <div>
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
                    }
                    {viewState === 'company' && isAuthenticated &&
                        <div>
                            <CompanyList
                                companies={companies}
                                />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

SettingsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  viewState: PropTypes.string,
  users: PropTypes.object,
  companies: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}

function mapStateToProps(state) {
  const { users, companies, view, auth } = state
  const { userList, authenticated } = users
  const { viewState } = view
  const { companyList } = companies
  const { isAuthenticated, errorMessage } = auth

  return {
    users,
    companies,
    viewState,
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(SettingsContainer)
