import React, { Component, PropTypes } from 'react'
import BlogListPost from '../components/BlogListPost'

export default class BlogPostPage extends Component {

  renderBlogPostRow( post ) {

    return (
      <BlogListPost post={ post } />
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
