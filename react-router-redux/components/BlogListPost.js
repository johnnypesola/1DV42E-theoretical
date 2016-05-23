import React, { Component, PropTypes } from 'react'
import { Link, withRouter } from 'react-router'
import { deleteBlogPost } from '../actions'

class BlogListPost extends Component {

  constructor( props, context ) {
    super( props, context )
  }

  pad( num, size ) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  renderTime( timestamp ) {

    const date = new Date( timestamp )

    const year = date.getFullYear()
    const month = this.pad( date.getMonth() + 1, 2 )
    const day = this.pad( date.getDate(), 2 )
    const hour = this.pad( date.getHours(), 2 )
    const minute = this.pad( date.getMinutes(), 2 )
    const second = this.pad( date.getSeconds(), 2 )

    return `${ year }-${ month }-${ day } ${ hour }:${ minute }:${ second }`
  }

  removeBlogPost( index ) {

    const { dispatch } = this.props

    dispatch( deleteBlogPost( index, index ) )
  }

  render() {

    const { post, id, index } = this.props

    const removeBlogPost = this.removeBlogPost.bind( this, index );

    return (
      <div>
        <h3>
          <Link to="/post" id={ id }>{ post.header }</Link>
          <button id={ 'delete' + index + '-button' } onClick={ removeBlogPost }>Remove blog post</button>
        </h3>
        <p>
          { post.content }
        </p>
        <img width="50" src={ 'img/' + post.picture } alt={ post.name } /> { post.name } @ { this.renderTime( post.timestamp ) }
      </div>
    )
  }
}

BlogListPost.propTypes = {
  post: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default withRouter( BlogListPost )