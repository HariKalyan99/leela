import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Headers = ({authenticate, auth}) => {
  const navigate = useNavigate();

  const {mutate: logoutFn, isPending, isError, error} = useMutation({
    mutationFn: async() => {
      try {
        const res = await fetch('/api/auth/logout', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        })

        const data = await res.json();
        if(!res.ok) throw new Error(data.error || "Something went wrong");
        authenticate("logout")
        navigate(-1);
      } catch (error) {
        console.log(error);
        throw new error;
      }
    }, onSuccess: () => {
      toast.success("Logged out successfull")
    },onError: () => {
			toast.error('Logout failed')
		}
  })


  const handleLogout = async() => {
    logoutFn()
  }
  return (
    <div>
      <nav class="navbar navbar-expand-md bg-black sticky-top border-bottom" data-bs-theme="dark">
  <div class="container-fluid">
      <img src="https://lh3.googleusercontent.com/p/AF1QipPUXW-V1FF90twoJM5NvG5jdBQNNQnyOZi-mkOu=s680-w680-h510" alt="" height={75}/>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel">Aperture</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className='d-flex justify-content-center'>
      <div class="offcanvas-body w-75">
        <ul class="navbar-nav flex-grow-1 justify-content-around ">
          
          <li class="nav-item"><a class="nav-link " href="#">Tour</a></li>
          <li class="nav-item"><a class="nav-link " href="#">Product</a></li>
          <li class="nav-item"><a class="nav-link " href="#">Features</a></li>
          <li class="nav-item"><a class="nav-link " href="#">Enterprise</a></li>
          <li class="nav-item"><a class="nav-link " href="#">Support</a></li>
<button type="button" class="btn btn-outline-light me-2" onClick={handleLogout}>{isPending ? "loading..." : "Logout"}</button> 
        </ul>
      </div>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Headers;