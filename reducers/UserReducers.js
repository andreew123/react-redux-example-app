import { START_FETCHING_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
    REQUEST_SAVE_USER, SAVE_USER_SUCCESS, SAVE_USER_FAILURE
} from '../actions/UserActions'

export function users(state = {
    isFetching: true,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
    switch (action.type) {
      case START_FETCHING_USERS:
        return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: true
        })
      case FETCH_USERS_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          userList: action.userList
        })
      case FETCH_USERS_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true
        })
      default:
        return state
   }
}

export function saveUser(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case REQUEST_SAVE_USER:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
        user: action.data
      })
    case SAVE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case SAVE_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: action.message
      })
    default:
      return state
    }
}
