import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import FinanceRecordList from '../components/Finance/FinanceRecordList'
import NewFinanceRecordForm from '../components/Finance/NewFinanceRecordForm'
import { logoutUser } from '../actions/LogoutActions'

class FinanceContainer extends Component {

	render() {
		const { dispatch, finances, isAuthenticated, errorMessage } = this.props
		return (
			<div>
				<Navbar
					isAuthenticated={isAuthenticated}
					dispatch={dispatch}
					onLogoutClick={() => dispatch(logoutUser())}
				/>
				<div>
					<FinanceRecordList
						isAuthenticated={isAuthenticated}
						finances={finances}
					/>
				</div>
			</div>
		)
	}
}

FinanceContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  finances: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}

function mapStateToProps(state) {
    const { finances, auth } = state
    const { financeList, authenticated } = finances
    const { isAuthenticated, errorMessage } = auth

    return {
        finances,
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps)(FinanceContainer)
