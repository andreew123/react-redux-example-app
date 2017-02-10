import { START_FETCHING_COMPANIES, FETCH_COMPANIES_SUCCESS, FETCH_COMPANIES_FAILURE,
    REQUEST_SAVE_COMPANY, SAVE_COMPANY_SUCCESS, SAVE_COMPANY_FAILURE
} from '../actions/CompanyActions'

export function companies(state = {
    isFetching: true,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
    switch (action.type) {
      case START_FETCHING_COMPANIES:
        return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: true
        })
      case FETCH_COMPANIES_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          companyList: action.companyList
        })
      case FETCH_COMPANIES_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true
        })
      default:
        return state
   }
}

export function saveCompany(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case REQUEST_SAVE_COMPANY:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
        company: action.data
      })
    case SAVE_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case SAVE_COMPANY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: action.message
      })
    default:
      return state
    }
}
