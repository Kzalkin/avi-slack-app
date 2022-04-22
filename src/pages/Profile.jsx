import React from 'react'
import "../assets/styles/Profile.scss"

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('User'))
  return (
    <div className='welcome'>Welcome {user.email}!</div>
  )
}

export default Profile