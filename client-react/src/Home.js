/* globals prompt */
import React from 'react'
import Header from './Header'
import { useHistory } from 'react-router-dom'

export default function Home (props) {
  const history = useHistory()

  function handleChangeRoom (evt) {
    const room = evt.target.value
    history.push(`/rooms/${room}`)
  }

  function handleAddRoom () {
    const room = prompt('Enter a room name:')
    history.push(`/rooms/${room}`)
  }

  return (
    <div>
      <Header username={props.username} onLogout={props.onLogout} />
      <div className='home'>
        <h1>Home</h1>
        <div id='rooms'>
          <h2>Select a room</h2>
          <select onChange={handleChangeRoom} name='room' id='room-select' value={props.room}>
            <option value=''>--Select a Room--</option>
            {props.rooms.map(room => <option key={room} value={room}>{room}</option>)}
          </select>
          <div>Or</div>
          <button onClick={handleAddRoom}>Add Room</button>
        </div>
      </div>
    </div>
  )
}
