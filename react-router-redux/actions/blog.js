import {
  ADD_BLOG_POSTS,
  ADD_BLOG_POST,
  IS_LOADING,
  BLOG_POSTS_1000_URL,
  BLOG_POSTS_1_URL
} from '../constants'

function addBlogPostsAction(jsonResult) {
  return {
    type: ADD_BLOG_POSTS,
    posts: jsonResult
  };
}

function addBlogPostAction(jsonResult) {
  return {
    type: ADD_BLOG_POST,
    post: jsonResult
  };
}

function loadingChangedAction(isLoading) {
  return {
    type: IS_LOADING,
    isLoading: isLoading
  }
}

export default {
  loadBlogPostsAction: () => {
    return (dispatch, getState) => {
      var state = getState();
      var url = BLOG_POSTS_1000_URL;
      dispatch(loadingChangedAction(true));

      return fetch(url)
        .then(function(result) {
          dispatch(loadingChangedAction(false));

          if (result.status === 200) {
            return result.json();
          }

          throw "request failed";
        })
        .then(function(jsonResult) {
          dispatch(addBlogPostsAction(jsonResult));
        })
        .catch(function(err) {
          alert("Couldn't get blog posts");
        });
    }
  },

  loadBlogPostAction: () => {

    return function(dispatch, getState) {
      var state = getState();
      var url = BLOG_POSTS_1_URL;
      dispatch(loadingChangedAction(true));

      return fetch(url)
        .then(function(result) {
          dispatch(loadingChangedAction(false));

          if (result.status === 200) {
            return result.json();
          }

          throw "request failed";
        })
        .then(function(jsonResult) {
          dispatch(addBlogPostsAction(jsonResult));
        })
        .catch(function(err) {
          alert("Couldn't get blog post");
        });
    }
  }
}
