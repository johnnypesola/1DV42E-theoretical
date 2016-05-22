import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BlogListPost from '../components/BlogListPost'
import { fetchBlogPostsIfNeeded } from '../actions'

class BlogListPage extends Component {

  constructor( props, context ) {
    super( props, context )
  }

  renderBlogPostRow( post, index ) {

    return (
      <BlogListPost key={ index } post={ post } />
    )
  }

  componentDidMount() {

    const { dispatch } = this.props
    dispatch( fetchBlogPostsIfNeeded() )
  }

  /*
  componentWillReceiveProps(nextProps) {
    if ( nextProps.selectedReddit !== this.props.selectedReddit ) {
      const { dispatch, selectedReddit } = nextProps
      dispatch( fetchPostsIfNeeded( selectedReddit ) )
    }
  }
  */

  render() {
    const { isFetching, posts } = this.props

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

function mapStateToProps( state )  {

  return {
    posts: state.reducer.blogPosts.items
  }
}

export default connect( mapStateToProps )( BlogListPage )