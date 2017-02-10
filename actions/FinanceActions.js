export const START_FETCHING_FINANCES = 'START_FETCHING_FINANCES';
export const FETCH_FINANCES_SUCCESS = 'FETCH_FINANCES_SUCCESS';
export const FETCH_FINANCES_FAILURE = 'FETCH_FINANCES_FAILURE';
export const REQUEST_SAVE_FINANCE = 'REQUEST_SAVE_FINANCE';
export const SAVE_FINANCE_SUCCESS = 'SAVE_FINANCE_SUCCESS';
export const SAVE_FINANCE_FAILURE = 'SAVE_FINANCE_FAILURE';

function requestFinanceList() {
  return {
    type: START_FETCHING_FINANCES,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveFinanceList(finances) {
  return {
    type: FETCH_FINANCES_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
	financeList: finances.financeList
  }
}

function failFinanceList(error) {
  return {
    type: FETCH_FINANCES_FAILURE,
    isFetching: false,
    isAuthenticated: false,
	error: error
  }
}

export function fetchFinanceRecords() {

    let config = {
		method: 'GET',
		headers: { 'Content-Type':'application/x-www-form-urlencoded' }
    }

    return dispatch => {
		dispatch(requestFinanceList())
		return fetch('http://localhost:3001/finances', config)
	      .then(response =>
	        response.json()
	        .then(finances => ({ finances, response }))
		).then(({ finances, response }) =>  {
	        if (!response.ok) {
	          dispatch(failFinanceList(finances.message))
	          return Promise.reject(finances)
	        }
	        else {
	          // Dispatch the success action
	          dispatch(receiveFinanceList(finances))
	        }
	      }).catch(err => console.log("Error: ", err))
    }
}

export function requestSaveFinance(data) {
    return {
      type: REQUEST_SAVE_FINANCE,
      isFetching: true,
      isAuthenticated: false,
      data
    }
}

export function saveFinanceSuccess(res) {
    return {
      type: SAVE_FINANCE_SUCCESS,
      isFetching: false,
      isAuthenticated: true
    }
}

export function saveFinanceFail(message) {
    return {
      type: SAVE_FINANCE_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      message
    }
}

export function saveFinanceRecord(data) {

    let token = localStorage.getItem('id_token') || null

    let config = {
		method: 'POST',
		headers: { 'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}` },
        body: `companyId=${data.companyId}&closingBalance=${data.closingBalance}
            &phoenixDebit=${data.phoenixDebit}&incomingOep=${data.incomingOep}`
    }

    return dispatch => {
		dispatch(requestSaveFinance())
		return fetch('http://localhost:3001/finance', config)
	      .then(response =>
	        response.json()
	        .then(finance => ({ finance, response }))
		).then(({ finance, response }) =>  {
	        if (!response.ok) {
	          dispatch(saveFinanceFail(finance.message))
	          return Promise.reject(finance)
	        }
	        else {
	          // Dispatch the success action
	          dispatch(saveFinanceSuccess(finance))
	        }
	      }).catch(err => console.log("Error: ", err))
    }
}
