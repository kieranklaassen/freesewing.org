import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import UserSocial from '../user-social'

const UserProfile = props => {
  const handleResult = (result, data) => {
    if (result) setUser(data.profile)
    else console.log(data)
  }
  const [user, setUser] = useState(false)
  useEffect(() => {
    props.app.backend.loadProfile(props.user, handleResult)
  }, [])

  const styles = {
    avatar: {
      background: '#000',
      borderRadius: '4px'
    }
  }
  if (!user) return null

  return (
    <React.Fragment>
      <img src={user.pictureUris.l} style={styles.avatar} className="shadow" alt={user.username} />
      <Markdown source={user.bio} />
      <p style={{ textAlign: 'center' }}>
        <UserSocial accounts={user.social} size={36} />
      </p>
    </React.Fragment>
  )
}

export default UserProfile
