import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import {

  REQUEST_BLOG_POSTS,
  RECEIVE_BLOG_POSTS,
  REQUEST_BLOG_POST,
  RECEIVE_BLOG_POST
} from '../actions'


function blogPosts(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_BLOG_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case REQUEST_BLOG_POST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_BLOG_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.blogPosts,
        lastUpdated: action.receivedAt
      })
    case RECEIVE_BLOG_POST:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.blogPost,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  blogPosts,
  routing
})

export default rootReducer
