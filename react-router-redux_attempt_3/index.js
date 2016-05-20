import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import App from './containers/App'
import BlogPostPage from './containers/BlogPostPage'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

console.log( store, history )

render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute component={ App }/>
        <Route path="post" component={ BlogPostPage }/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
