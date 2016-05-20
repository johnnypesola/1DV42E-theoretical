import React, { Component, PropTypes } from 'react'

export default class Blog extends Component {

  renderBlogPostRow( post ) {

    return (
      <div>
        <h3>
          <a href="#/post">{ post.get('header') }</a>
        </h3>
        <p>
          { post.get('content') }
        </p>
        <img width="50" src="app/img/{ post.get('picture')}" alt="{ post.get('name') }" /> { post.get('name') } @ { post.get('timestamp') }
      </div>
    )
  }

  render() {
    const {
      isFetching, posts
    } = this.props

    return (
      <div>
        { posts.map( this.renderBlogPostRow ) }
      </div>
    )
  }
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

Blog.defaultProps = {

}
