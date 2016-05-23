import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BlogListPost from '../components/BlogListPost'
import { fetchBlogPostsIfNeeded } from '../actions'

class BlogListPage extends Component {

  constructor( props, context ) {
    super( props, context )

    const { dispatch } = this.props

    // Bind 'this' to 'this' in class methods, if they are called within jsx code
    this.renderBlogPostRow = this.renderBlogPostRow.bind( this )
  }

  renderBlogPostRow( post, index ) {

    const { dispatch } = this.props

    return (
      <BlogListPost
        key={ index }
        index={ index }
        post={ post }
        id={ 'post' + index + '-link' }
        dispatch={ dispatch }
      />
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

    const { posts } = this.props

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