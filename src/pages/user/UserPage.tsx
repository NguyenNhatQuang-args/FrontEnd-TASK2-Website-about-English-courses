import { Outlet } from 'react-router-dom'

const UserPage = () => {
  return (
    <div>
      <h2>User Layout</h2>
      <Outlet />
    </div>
  )
}

export default UserPage
