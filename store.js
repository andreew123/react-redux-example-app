import { createStore, applyMiddleware } from 'redux'
import mpApp from './reducers'
import thunkMiddleware from 'redux-thunk'
import api from './middleware/api'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(mpApp)

export default store
