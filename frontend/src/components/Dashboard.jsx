import React from 'react'
import Headers from './Headers';

const Dashboard = ({authenticate, auth}) => {
  return (
    <div>
      <Headers authenticate={authenticate} auth={auth}/>
    </div>
  )
}

export default Dashboard;