export const START_FETCHING_USERS = 'START_FETCHING_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const REQUEST_SAVE_USER = 'REQUEST_SAVE_USER';
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
export const SAVE_USER_FAILURE = 'SAVE_USER_FAILURE';

function requestUserList() {
  return {
    type: START_FETCHING_USERS,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveUserList(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
	userList: users.userList
  }
}

function failUserList(error) {
  return {
    type: FETCH_USERS_FAILURE,
    isFetching: false,
    isAuthenticated: false,
	error: error
  }
}

// Uses the API middlware to get users list
export function fetchUsers() {

    let config = {
		method: 'GET',
		headers: { 'Content-Type':'application/x-www-form-urlencoded' }
    }

    return dispatch => {
		dispatch(requestUserList())
		return fetch('http://localhost:3001/users', config)
	      .then(response =>
	        response.json()
	        .then(users => ({ users, response }))
		).then(({ users, response }) =>  {
	        if (!response.ok) {
	          dispatch(failUserList(users.message))
	          return Promise.reject(users)
	        }
	        else {
	          // Dispatch the success action
	          dispatch(receiveUserList(users))
	        }
	      }).catch(err => console.log("Error: ", err))
    }
}

export function requestSaveUser(data) {
    return {
      type: REQUEST_SAVE_USER,
      isFetching: true,
      isAuthenticated: false,
      data
    }
}

export function saveUserSuccess(res) {
    return {
      type: SAVE_USER_SUCCESS,
      isFetching: false,
      isAuthenticated: true
    }
}

export function saveUserFail(message) {
    return {
      type: SAVE_USER_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      message
    }
}

export function saveUser(data) {

    let config = {
		method: 'POST',
		headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: `lastname=${data.lastname}&firstname=${data.firstname}&email=${data.email}
            &password=${data.password}&birthday=${data.birthday}&phone=${data.phone}
            &title=${data.title}&roleId=${data.roleId}`
    }

    return dispatch => {
		dispatch(requestSaveUser())
		return fetch('http://localhost:3001/user', config)
	      .then(response =>
	        response.json()
	        .then(user => ({ user, response }))
		).then(({ user, response }) =>  {
	        if (!response.ok) {
	          dispatch(saveUserFail(user.message))
	          return Promise.reject(user)
	        }
	        else {
	          // Dispatch the success action
	          dispatch(saveUserSuccess(user))
	        }
	      }).catch(err => console.log("Error: ", err))
    }
}
