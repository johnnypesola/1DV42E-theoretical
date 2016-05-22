import fetch from 'isomorphic-fetch'

export const REQUEST_BLOG_POSTS = 'REQUEST_BLOG_POSTS'
export const RECEIVE_BLOG_POSTS = 'RECEIVE_BLOG_POSTS'
export const REQUEST_BLOG_POST = 'REQUEST_BLOG_POST'
export const RECEIVE_BLOG_POST = 'RECEIVE_BLOG_POST'


// Test Data constants
const DATA_PATH = 'data/' // http://pesola.local.se/temp/theoretical-temp/data/
const BLOG_POSTS_1000_URL = DATA_PATH + '1000-blog-posts.json'
const BLOG_POSTS_500_URL = DATA_PATH + '500-blog-posts.json'
const BLOG_POSTS_100_URL = DATA_PATH + '100-blog-posts.json'
const BLOG_POSTS_10_URL = DATA_PATH + '10-blog-posts.json'
const BLOG_POSTS_1_URL = DATA_PATH + '1-blog-posts.json'

// Blog posts actions

function requestBlogPosts() {
  return {
    type: REQUEST_BLOG_POSTS
  }
}

function receiveBlogPosts( json ) {

  return {
    type: RECEIVE_BLOG_POSTS,
    blogPosts: json,
    receivedAt: Date.now()
  }
}

function fetchBlogPosts( ) {
  return dispatch => {
    dispatch( requestBlogPosts() )
    return fetch( BLOG_POSTS_1000_URL )
      .then( response => response.json() )
      .then( json => dispatch( receiveBlogPosts( json ) ) )
  }
}

function shouldFetchBlogPosts( state ) {

  const posts = state.reducer.blogPosts

  // Return true if there are no posts and we are not fetching posts at the moment.
  return (!posts || posts.items.length === 0 || posts && !posts.isFetching )

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
    return fetch( BLOG_POSTS_1_URL )
      .then( response => response.json() )
      .then( json => dispatch( receiveBlogPost( json ) ) )
  }
}
