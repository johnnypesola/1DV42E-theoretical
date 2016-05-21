import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BlogListPost from '../components/BlogListPost'
import { fetchBlogPostsIfNeeded } from '../actions'

class BlogListPage extends Component {
  
  renderBlogPostRow( post, index ) {

    return (
      <BlogListPost key={ index } post={ post } />
    )
  }

  componentDidMount() {

    console.log( 'componentDidMount', 'BlogListPage' )

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

        <h1>Welcome to this testblog</h1>

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

  const { reducer } = state

  return {
    posts: reducer.blogPosts.items
  }
}

export default connect( mapStateToProps )( BlogListPage )