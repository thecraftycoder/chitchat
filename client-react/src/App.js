/* globals fetch */
import React from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Chat from './Chat'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import io from 'socket.io-client'
const socket = io()

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      user: null,
      token: null
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount () {
    socket.on('chat message', msg => {
      console.log('Got a message:', msg)
      this.setState({ messages: this.state.messages.concat(msg) })
    })
  }

  getRooms () {
    const rooms = this.state.messages.map(msg => msg.room)
    rooms.push(this.state.room) // we have to add the currentRoom to the list, otherwise it won't be an option if there isn't already a message with that room
    const filtered = rooms.filter(room => room) // filter out undefined or empty string
    const uniqueRoomsFiltered = Array.from(new Set(filtered)) // filters out the duplicates
    return uniqueRoomsFiltered
  }

  sendMessage (message) {
    socket.emit('chat message', {
      ...message,
      token: this.state.token
    })
  }

  handleLogin (user, cb) {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        if (data.errorMsg) return cb(data.errorMsg)
        this.setState({
          user: user.username,
          token: data.token
        }, () => cb())
      })
      .catch(cb)
  }

  handleSignup (user, cb) {
    fetch('/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        if (data.errorMsg) return cb(data.errorMsg)
        cb()
      })
      .catch(cb)
  }

  handleLogout () {
    this.setState({
      user: null,
      token: null
    })
  }

  handFetch () {
    // Get initial list of messages
    fetch('/messages', {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('fetched data from server')
        this.setState({ messages: data.messages })
      })
  }

  render () {
    return (
      <div>
        <Switch>
          <Route path='/rooms/:roomname'>
            {this.state.token ? (
              <Chat
                messages={this.state.messages}
                sendMessage={this.sendMessage.bind(this)}
                username={this.state.user}
                onLogout={this.handleLogout}
              />
            ) : (
              <Redirect
                to={{
                  pathname: '/login'
                }}
              />
            )}
          </Route>

          <Route path='/login'>
            <Login handleLogin={this.handleLogin.bind(this)} handleFetch={this.handFetch.bind(this)} />
          </Route>

          <Route path='/sign-up'>
            <Signup handleSignup={this.handleSignup.bind(this)} />
          </Route>

          <Route path='/'>
            {this.state.token ? (
              <Home
                rooms={this.getRooms()}
                username={this.state.user}
                onLogout={this.handleLogout}
              />
            ) : (
              <Redirect
                to={{
                  pathname: '/login'
                }}
              />
            )}
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App
