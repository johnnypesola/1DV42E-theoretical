import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BlogPost from '../components/BlogPost'
import { fetchBlogPost } from '../actions'

export default class BlogPostPage extends Component {

  constructor(props) {
    super(props)
    console.log( 'BlogPostPage constructor' )
  }

  componentDidMount() {

    console.log( 'componentDidMount', this.props )

    const { dispatch } = this.props
    dispatch( fetchBlogPost() )
  }

  renderBlogPostRow( post ) {

    if( post ) {

      return (
        <BlogPost post={ post } />
      )
    }
  }

  render() {
    const {
      isFetching, post
    } = this.props

    return (
      <div>
        fisk
        { this.renderBlogPostRow( post ) }
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

  const { reducer } = state

  return {
    post: reducer.blogPosts.item
  }
}

export default connect( mapStateToProps )( BlogPostPage )