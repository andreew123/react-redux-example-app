import React, { Component, PropTypes } from 'react'
import Login from './Login'
import { loginUser } from '../actions/LoginActions'

export default class Home extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props

    return (
      <div>
        {!isAuthenticated &&
            <Login
                errorMessage={errorMessage}
                onLoginClick={ creds => dispatch(loginUser(creds)) }
            />
        }

        {isAuthenticated &&
            <div>
                <div>Üdvözlünk az oldalon!</div>
                <main>{this.props.children}</main>
            </div>
        }

     </div>
    )
  }

}

Home.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
}
