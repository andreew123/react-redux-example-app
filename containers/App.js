import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/LoginActions'
import Login from '../components/Login'
import Header from '../components/Header'
import Home from '../components/Home'

class App extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
      <div>
        <Header
          isAuthenticated={isAuthenticated}
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

App.propTypes = {
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

export default connect(mapStateToProps)(App)
