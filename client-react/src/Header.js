import React from 'react'
import {
  useHistory
} from 'react-router-dom'

export default function Header (props) {
  const history = useHistory()

  const handleClick = () => {
    props.onLogout()
    history.push('/login')
  }

  return (
    <div className='header'>
      <span className='username-header'>Hello, {props.username}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}
