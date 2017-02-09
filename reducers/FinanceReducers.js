import { START_FETCHING_FINANCES, FETCH_FINANCES_SUCCESS, FETCH_FINANCES_FAILURE,
    REQUEST_SAVE_FINANCE, SAVE_FINANCE_SUCCESS, SAVE_FINANCE_FAILURE
} from '../actions/FinanceActions'

export function finances(state = {
    isFetching: true,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
    switch (action.type) {
      case START_FETCHING_FINANCES:
        return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: true
        })
      case FETCH_FINANCES_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          financeList: action.financeList
        })
      case FETCH_FINANCES_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true
        })
      default:
        return state
   }
}

export function saveFinance(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case REQUEST_SAVE_FINANCE:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
        finance: action.data
      })
    case SAVE_FINANCE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case SAVE_FINANCE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: action.message
      })
    default:
      return state
    }
}
