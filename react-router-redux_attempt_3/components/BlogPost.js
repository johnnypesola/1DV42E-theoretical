import React, { Component, PropTypes } from 'react'

export default class BlogPost extends Component {

  renderBlogPostTag( tag ) {
    return (
      <li>
        tag
      </li>
    )
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
          { post.timestamp }
          <h3>
            Author
          </h3>
          <img width="50" src="app/img/{ post.picture }" alt="{ post.name }" /> { post.name }<br />
          Email: { post.email }<br />

          <h3>Tags</h3>
          <ul>
            { post.tags.map( this.renderBlogPostTag ) }
          </ul>

          <a href="#/">Back</a>

      </div>
    )
  }
}

BlogPost.propTypes = {
  post: PropTypes.object.isRequired
}

BlogPost.defaultProps = {

}
