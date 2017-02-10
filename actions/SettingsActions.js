// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const CHANGE_VIEW_REQUEST = 'CHANGE_VIEW_REQUEST'
export const CHANGE_VIEW_SUCCESS = 'CHANGE_VIEW_SUCCESS'

function requestChangeView() {
  return {
    type: CHANGE_VIEW_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveChangeView(viewState) {
  return {
    type: CHANGE_VIEW_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    viewState: viewState
  }
}

// Change the view
export function changeViewState(viewState) {
    console.log('viewState', viewState);
  return dispatch => {
    dispatch(requestChangeView())
    dispatch(receiveChangeView(viewState))
  }
}
