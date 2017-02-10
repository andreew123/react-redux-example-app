import { CHANGE_VIEW_SUCCESS } from '../actions/SettingsActions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export function view(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    viewState: 'user'
  }, action) {
  switch (action.type) {
    case CHANGE_VIEW_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        viewState: action.viewState
      })
    default:
      return state
    }
}
