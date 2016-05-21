import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BlogListPost from '../components/BlogListPost'

class BlogListPage extends Component {
  
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

BlogListPage.propTypes = {
  posts: PropTypes.array,
  isFetching: PropTypes.bool
}

BlogListPage.defaultProps = {

}

function mapStateToProps( state )  {

  console.log( 'state', state )
  const { reducer } = state

  const { BlogPosts } = reducer
  const posts = BlogPosts || []

  return {
    posts
  }
}

export default connect( mapStateToProps )( BlogListPage )