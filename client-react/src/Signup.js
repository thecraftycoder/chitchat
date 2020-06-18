import React from 'react'
import { useHistory, Link } from 'react-router-dom'

export default function Signup (props) {
  const history = useHistory()

  function redirectLogin (err) {
    if (err) return console.log(err)
    history.push('/login')
  }

  return (
    <div>
      <h1>Signup</h1>
      <div>
        <SignupForm onSubmit={props.handleSignup} redirectLogin={redirectLogin} />
      </div>
    </div>
  )
}

class SignupForm extends React.Component {
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
    this.props.onSubmit({ username: this.state.username, password: this.state.password }, this.props.redirectLogin)
  }

  render () {
    return (
      <div>
        <form id='Signup-form' onSubmit={this.handleSubmit.bind(this)}>
          <input id='username' type='text' placeholder='username...' value={this.state.username} onChange={this.handleChangeUsername.bind(this)} />
          <input id='password' type='password' placeholder='password...' value={this.state.password} onChange={this.handleChangePassword.bind(this)} />
          <button type='submit'>Sign up</button>
        </form>
        <div className='login-signup-redirect'>
          <span>Already have an account?</span>
          <Link to='/login'>Log in here</Link>
        </div>
      </div>
    )
  }
}
