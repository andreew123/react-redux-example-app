import { combineReducers } from 'redux'
import { auth } from './reducers/AuthReducers'
import { users, saveUser } from './reducers/UserReducers'
import { finances, saveFinance } from './reducers/FinanceReducers'

// We combine the reducers here so that they
// can be left split apart above
const mpApp = combineReducers({
  auth,
  users,
  saveUser,
  finances,
  saveFinance
})

export default mpApp
