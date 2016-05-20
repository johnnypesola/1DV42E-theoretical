import React, { Component, PropTypes } from 'react'
import BlogPost from '../components/BlogPost'

export default class BlogPostPage extends Component {

  renderBlogPostRow( post ) {

    return (
      <BlogPost post={ post } />
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

BlogPostPage.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool
}

BlogPostPage.defaultProps = {

}
