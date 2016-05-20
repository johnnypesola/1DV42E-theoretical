import React from 'react'
import { connect } from 'react-redux'
import { loadBlogPostsAction, loadBlogPostAction } from '../actions/blog'
import { increase } from '../actions/count'

class Blog extends React.Component {

  constructor( props ) {
      super( props )

      this.state = {
      }
  }

  componentWillMount() {

    console.log( this.props.loadBlogPosts )

    this.props.loadBlogPosts()
  }

  renderBlogPost( post ) {

    return (
        <div>
          <h3>
            <a href="#/post">{ post.get('header') }</a>
          </h3>
          <p>
            { post.get('content') }
          </p>
          <img width="50" src="app/img/{ post.get('picture')}" alt="{ post.get('name') }" /> { post.get('name') } @ { post.get('timestamp') }
        </div>
    )
  }


  render() {

    console.log( 'this.props.posts', this.props.posts )

    return (

      <div>
        Should be filled with blog posts

        {
          Array.isArray( this.props.posts ) ? this.props.posts.map( ( post ) => {
            this.renderBlogPost( post )
          } ) : null
        }

      </div>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return { posts: state };
  },
  function mapDispatchToProps(dispatch) {
    return {
      loadBlogPosts: () => { dispatch( loadBlogPostsAction() ) },
      loadBlogPost: () => { dispatch( loadBlogPostAction() ) }
    };
  }
)(Blog)
