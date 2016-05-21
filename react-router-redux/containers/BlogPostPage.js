import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BlogPost from '../components/BlogPost'
import { fetchBlogPost } from '../actions'

export default class BlogPostPage extends Component {

  constructor( props ) {
    super( props )
  }

  componentDidMount() {

    const { dispatch } = this.props
    dispatch( fetchBlogPost() )
  }

  renderBlogPostRow( post ) {

    const { history } = this.props

    if( post && post.content ) {

      return (
        <BlogPost
          key={ post.id } post={ post }
          history={ history }
        />
      )
    }
  }

  render() {
    const { post } = this.props

    return (
      <div>
        fisk
        { this.renderBlogPostRow( post ) }
      </div>
    )
  }
}

BlogPostPage.propTypes = {

  // post: PropTypes.object,
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