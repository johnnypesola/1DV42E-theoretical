import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BlogPost from '../components/BlogPost'

export default class BlogPostPage extends Component {

  constructor(props) {
    super(props)
    console.log( 'BlogPostPage constructor' )
  }


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
        fisk
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

function mapStateToProps( state )  {

  console.log( 'state', state )
  const { reducer } = state

  const { BlogPosts } = reducer
  const posts = BlogPosts || []

  return {
    posts
  }
}

export default connect( mapStateToProps )( BlogPostPage )