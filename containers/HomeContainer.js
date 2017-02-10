import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/LoginActions'
import { logoutUser } from '../actions/LogoutActions'
import LoginForm from '../components/Auth/LoginForm'
import Header from '../components/Header'

class HomeContainer extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
      <div>
        {isAuthenticated &&
            <Header
                isAuthenticated={isAuthenticated}
                dispatch={dispatch}
                onLogoutClick={() => dispatch(logoutUser())}
            />
        }
        <div>
            {!isAuthenticated &&
                <LoginForm
                    errorMessage={errorMessage}
                    onLoginClick={ creds => dispatch(loginUser(creds)) }
                />
            }

            {isAuthenticated &&
                <div>
                    <div>Üdvözlünk az oldalon!</div>
                </div>
            }
        </div>
      </div>
    )
  }
}

HomeContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {

  const { auth } = state
  const { isAuthenticated, errorMessage } = auth

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(HomeContainer)
