import React, { PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'


class App extends React.Component {

  constructor( props ) {
      super( props )

      this.state = {
      }
  }

  componentDidMount() {
    const { dispatch } = this.props
    console.log( dispatch )
  }

  render() {

    // console.log( this.props.dispatch )

    return (
      <div>
        <header>
          Links:
          {' '}
          <Link to="/">Home</Link>
          {' '}
          <Link to="/foo">Foo</Link>
          {' '}
          <Link to="/bar">Bar</Link>
        </header>
        <div>
          <button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
        </div>
        <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default App
