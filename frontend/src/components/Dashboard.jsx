import React, { useEffect } from 'react'
import Headers from './Headers';
import { useQuery } from '@tanstack/react-query';


const Dashboard = ({authenticate, auth}) => {
  const {data: authUser, isLoading, error, isError} = useQuery({
    queryKey: ['authUser'],
    queryFn: async() => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        console.log(data);
        if(data.error) return null

        if(!res.ok) throw new Error(data.error || "Something went wrong");
        return data
      } catch (error) {
        console.log(error);
        throw new Error(error)
      }
    },
    retry: false
  })

  return (
    <>
      {authUser ? <div className='db'>
      <Headers authenticate={authenticate} auth={auth}/> </div> : <h1> Loading... </h1>}
    </>
  )
}

export default Dashboard;