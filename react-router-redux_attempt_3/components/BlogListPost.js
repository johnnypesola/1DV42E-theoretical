import React, { Component, PropTypes } from 'react'

export default class BlogListPost extends Component {

  render() {
    const { post } = this.props

    return (
      <div>
        <h3>
          <a href="#/post">{ post.header }</a>
        </h3>
        <p>
          { post.content }
        </p>
        <img width="50" src="app/img/{ post.picture }" alt="{ post.name }" /> { post.name } @ { post.timestamp }
      </div>
    )
  }
}

BlogListPost.propTypes = {
  post: PropTypes.array.isRequired
}

BlogListPost.defaultProps = {

}
