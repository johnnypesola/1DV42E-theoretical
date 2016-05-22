import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import { routerReducer } from 'react-router-redux'

const reducer = combineReducers({
  reducer: rootReducer,
  routing: routerReducer
})


export default function configureStore( initialState ) {

  let store

  // Exclude dev tools in case we are building production
  
  store = createStore(
    reducer,
    initialState,
    applyMiddleware( thunkMiddleware ) // createLogger()
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
