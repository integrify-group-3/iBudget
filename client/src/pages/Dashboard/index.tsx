import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from '../../types'

export default function Dashboard(props: any) {
  const isAuthenticated = useSelector((state: AppState) => state.user.isAuthenticated)
  const user = useSelector((state: AppState) => state.user.user)
  // console.log('user here', user)
  useEffect(() => {
    if(!isAuthenticated) {
      props.history.push('/login')
    }
  }, [isAuthenticated, props.history])
  
  console.log(isAuthenticated)
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh'}}>
      {
        isAuthenticated && <h1>Welcome to your dashboard {user.firstName} {user.lastName}</h1>    
      }
    </div>
  )
}

