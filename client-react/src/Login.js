import React from 'react'
import { useHistory, Link } from 'react-router-dom'

export default function Login (props) {
  const history = useHistory()

  function redirectHome (err) {
    if (err) return console.log(err)
    props.handleFetch()
    history.push('/')
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <LoginForm onSubmit={props.handleLogin} redirectHome={redirectHome} />
      </div>
    </div>
  )
}

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChangeUsername (event) {
    this.setState({ username: event.target.value })
  }

  handleChangePassword (event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.onSubmit({ username: this.state.username, password: this.state.password }, this.props.redirectHome)
  }

  render () {
    return (
      <div>
        <form id='login-form' onSubmit={this.handleSubmit.bind(this)}>
          <input id='username' type='text' placeholder='username...' value={this.state.username} onChange={this.handleChangeUsername.bind(this)} />
          <input id='password' type='password' placeholder='password...' value={this.state.password} onChange={this.handleChangePassword.bind(this)} />
          <button type='submit'>Log in</button>
        </form>

        <div className='login-signup-redirect'>
          <span>Don't have an account?</span>
          <Link to='/sign-up'>Sign up here</Link>
        </div>
      </div>
    )
  }
}
