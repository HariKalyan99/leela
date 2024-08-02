import React from 'react'

const Signup = () => {
  return (
    <form className='d-flex flex-column justify-content-center align-items-center wrapper' >
    <h1 style={{fontSize: "4rem"}}>Signup</h1>
    <br />
    <br />
    <input type="text" placeholder='username' style={{width: "300px", height: "40px",border: "none", borderBottom: "1px solid black" , outline: "none", background: "transparent", color: "white"}} className='p-3 fs-5'/>

    <br />
    <input type="text" placeholder='fullname' style={{width: "300px", height: "40px",border: "none", borderBottom: "1px solid black" , outline: "none", background: "transparent", color: "white"}} className='p-3 fs-5'/>

    <br />
    <input type="email" placeholder='email' style={{width: "300px", height: "40px",border: "none", borderBottom: "1px solid black" , outline: "none", background: "transparent", color: "white"}} className='p-3 fs-5'/>

    <br />
    <input type="password" placeholder='password' style={{width: "300px", height: "40px",border: "none", borderBottom: "1px solid black" , outline: "none", background: "transparent", color: "white"}} className='p-3 fs-5'/>


    <button type='submit' className='btn btn-dark m-3'>Signup</button>
    <a href="#" style={{textDecoration: "none"}} className='text-black fw-bold'>Not registered, <span style={{textDecoration: "underline"}}>Register</span></a>
    </form>
  )
}

export default Signup