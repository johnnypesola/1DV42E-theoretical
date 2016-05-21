import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const REQUEST_BLOG_POSTS = 'REQUEST_BLOG_POSTS'
export const RECEIVE_BLOG_POSTS = 'RECEIVE_BLOG_POSTS'

export const REQUEST_BLOG_POST = 'REQUEST_BLOG_POST'
export const RECEIVE_BLOG_POST = 'RECEIVE_BLOG_POST'

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


// Blog posts actions

function requestBlogPosts() {
  return {
    type: REQUEST_BLOG_POSTS
  }
}

function receiveBlogPosts( json ) {
  return {
    type: RECEIVE_BLOG_POSTS,
    blogPosts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchBlogPosts( ) {
  return dispatch => {
    dispatch( requestBlogPosts() )
    return fetch( 'http://pesola.local.se/temp/data/1000-blog-posts.json' )
      .then( response => response.json() )
      .then( json => dispatch( receiveBlogPosts( json ) ) )
  }
}

function shouldFetchBlogPosts( state ) {

  const posts = state.reducer.blogPosts
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchBlogPostsIfNeeded() {
  return (dispatch, getState) => {

    if ( shouldFetchBlogPosts( getState() ) ) {
      return dispatch( fetchBlogPosts() )
    }
  }
}

// Blog post actions

function requestBlogPost() {
  return {
    type: REQUEST_BLOG_POST
  }
}

function receiveBlogPost( json ) {
  return {
    type: RECEIVE_BLOG_POST,
    blogPost: json,
    receivedAt: Date.now()
  }
}

export function fetchBlogPost( ) {
  return dispatch => {
    dispatch( requestBlogPost() )
    return fetch( 'http://pesola.local.se/temp/data/1-blog-posts.json' )
      .then( response => response.json() )
      .then( json => dispatch( receiveBlogPost( json ) ) )
  }
}
