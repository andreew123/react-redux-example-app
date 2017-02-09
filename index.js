import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import router from './router'
import store from './store'

let rootElement = document.getElementById('root')

render(
  <Provider store={store}>{router}</Provider>,
  rootElement
)
