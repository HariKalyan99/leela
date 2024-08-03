import React from 'react'
import Signup from './Signup'
import Login from './Login'

const Authentication = ({auth, authenticate}) => {
  
  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
        {auth ? <Signup authenticate={authenticate}/> : 
        <Login authenticate={authenticate}/>}
    </div>
  )
}

export default Authentication