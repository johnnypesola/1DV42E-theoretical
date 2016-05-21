import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BlogListPost from '../components/BlogListPost'
import { fetchBlogPostsIfNeeded } from '../actions'

class BlogListPage extends Component {
  
  renderBlogPostRow( post ) {

    return (
      <BlogListPost post={ post } />
    )
  }

  componentDidMount() {

    console.log( 'componentDidMount', this.props )

    const { dispatch, selectedReddit } = this.props
    dispatch( fetchBlogPostsIfNeeded() )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
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