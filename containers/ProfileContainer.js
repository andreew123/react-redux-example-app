import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/LoginActions'
import { logoutUser } from '../actions/LogoutActions'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Home from '../components/Home'

class ProfileContainer extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
      <div>
          <Navbar
            isAuthenticated={isAuthenticated}
            dispatch={dispatch}
            onLogoutClick={() => dispatch(logoutUser())}
          />
        <div className='container'>
            <Home
                isAuthenticated={isAuthenticated}
                errorMessage={errorMessage}
                dispatch={dispatch}
            />
        </div>
      </div>
    )
  }
}

ProfileContainer.propTypes = {
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

export default connect(mapStateToProps)(ProfileContainer)
