import React from 'react'
import Signup from './Signup'
import Login from './Login'

const Authentication = ({auth, authenticate, newUserSignup,
  newUserLogin}) => {
  
  return (
    <div className="d-flex justify-content-center flex-column align-items-center parent-wrapper w-100" >
        {auth === "signup" ? <Signup authenticate={authenticate} newUserSignup={newUserSignup}/> : 
        <Login authenticate={authenticate} newUserLogin={newUserLogin}/>}
    </div>
  )
}

export default Authentication