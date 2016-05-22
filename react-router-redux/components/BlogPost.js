import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'

class BlogPost extends Component {

  constructor( props, context ) {
    super( props, context )

    // Bind 'this' to 'this' in class methods, if they are called within jsx code
    this.goBack = this.goBack.bind(this)
  }

  renderBlogPostTag( tag, index ) {
    return (
      <li key={ index }>
        {tag}
      </li>
    )
  }

  goBack() {

    const { router } = this.props

    router.goBack();
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

  render() {
    const { post } = this.props

    return (
      <div>

          <h2>
            { post.header }
          </h2>
          <p>
            { post.content }
          </p>
          <h3>
            Date
          </h3>
          { this.renderTime( post.timestamp ) }
          <h3>
            Author
          </h3>
          <img width="50" src={ 'img/' + post.picture } alt={ post.name } /> { post.name }<br />
          Email: { post.email }<br />

          <h3>Tags</h3>
          <ul>
            { post.tags.map( this.renderBlogPostTag ) }
          </ul>

          <a href="#" onClick={ this.goBack }>Back</a>
      </div>
    )
  }
}

BlogPost.propTypes = {
  post: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter( BlogPost )
