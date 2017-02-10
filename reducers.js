import { combineReducers } from 'redux'
import { auth } from './reducers/AuthReducers'
import { users, saveUser } from './reducers/UserReducers'
import { finances, saveFinance } from './reducers/FinanceReducers'
import { companies, saveCompany } from './reducers/CompanyReducers'
import { view } from './reducers/SettingsReducers'

// We combine the reducers here so that they
// can be left split apart above
const mpApp = combineReducers({
  auth,
  users,
  saveUser,
  finances,
  saveFinance,
  companies,
  saveCompany,
  view,
})

export default mpApp
