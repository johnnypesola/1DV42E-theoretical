import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import BlogPostPage from './containers/BlogPostPage'
import BlogListPage from './containers/BlogListPage'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ BlogListPage } />
      <Route path="post" component={ BlogPostPage }/>
    </Router>
  </Provider>,
  document.getElementById('root')
)