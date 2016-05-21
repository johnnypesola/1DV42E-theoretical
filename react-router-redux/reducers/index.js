import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS,
  REQUEST_BLOG_POSTS, RECEIVE_BLOG_POSTS,
  RECEIVE_BLOG_POST
} from '../actions'

function selectedReddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByReddit(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.reddit]: posts(state[action.reddit], action)
      })
    default:
      return state
  }
}

// 

function blogPosts(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_BLOG_POSTS:
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
  postsByReddit,
  selectedReddit,
  blogPosts,
  routing
})

export default rootReducer
