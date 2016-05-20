//import { createDevTools } from 'redux-devtools'
//import LogMonitor from 'redux-devtools-log-monitor'
//import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { loadBlogPostsAction } from './actions/blog'

import * as reducers from './reducers'
import { App, Blog, BlogPost, Bar } from './components'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

/*
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)
*/

const store = createStore(
  reducer,
  applyMiddleware(thunk)
  //DevTools.instrument()
)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Blog}/>
          <Route path="post" component={BlogPost}/>
        </Route>
      </Router>

    </div>
  </Provider>,
  document.getElementById('mount')
)

// Add to empy line above for devtools: <DevTools />
