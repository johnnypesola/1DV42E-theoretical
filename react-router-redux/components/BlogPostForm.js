import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { addBlogPost } from '../actions'

class BlogPostForm extends Component {

  constructor( props, context ) {
    super( props, context )

    // Bind 'this' to 'this' in class methods, if they are called within jsx code
    this.addBlogPost = this.addBlogPost.bind( this )
    this.handleHeaderChange = this.handleHeaderChange.bind( this )
    this.handleContentChange = this.handleContentChange.bind( this )

    this.state = {
      header: '',
      content: '',
      email: 'sandrarodriquez@pasturia.com',
      picture: '5.jpg',
      name: 'Sandra Rodriquez',
      timestamp: Date.now(),
      tags: [
      'new'
      ]
    }
  }

  addBlogPost() {

    const { dispatch } = this.props
    const { header, content, email, picture, name, timestamp, tags } = this.state

    dispatch( addBlogPost( { header, content, email, picture, name, timestamp, tags } ) )
  }

  handleHeaderChange( event ) {

    this.setState( {
      header: event.target.value
    } );
  }

  handleContentChange( event ) {

    this.setState( {
      content: event.target.value
    } );
  }

  render() {

    const { header, content } = this.state

    return (
      <div>
        <h3>New post</h3>
        <p>
          <label>Header</label><br />
          <input
            title="Header"
            type="text"
            id="new-header"
            value={ header }
            onChange={ this.handleHeaderChange }
          />
        </p>
        <p>
          <label>Content</label><br />
          <textarea
            title="Content"
            id="new-content"
            value={ content }
            onChange={ this.handleContentChange }
          />
        </p>
        <button id="new-submit" onClick={ this.addBlogPost }>Add blog post</button>
      </div>
    )
  }
}

BlogPostForm.propTypes = {
  post: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter( BlogPostForm )