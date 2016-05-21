import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const REQUEST_BLOG_POSTS = 'REQUEST_POSTS'
export const RECEIVE_BLOG_POSTS = 'RECEIVE_POSTS'

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}

function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit))
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}

function shouldFetchPosts(state, reddit) {

  const posts = state.reducer.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {

    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}


////

function requestBlogPosts(reddit) {
  return {
    type: REQUEST_BLOG_POSTS,
    reddit
  }
}

function receiveBlogPosts(reddit, json) {
  return {
    type: RECEIVE_BLOG_POSTS,
    reddit,
    blogPosts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchBlogPosts( reddit ) {
  return dispatch => {
    dispatch( requestBlogPosts( reddit ) )
    return fetch( 'data/1000-blog-posts.json' )
      .then( response => response.json() )
      .then( json => dispatch( receiveBlogPosts( reddit, json ) ) )
  }
}

function shouldFetchBlogPosts( state, reddit ) {

  const posts = state.reducer.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchBlogPostsIfNeeded(reddit) {
  return (dispatch, getState) => {

    if ( shouldFetchBlogPosts( getState(), reddit ) ) {
      return dispatch( fetchBlogPosts(reddit) )
    }
  }
}