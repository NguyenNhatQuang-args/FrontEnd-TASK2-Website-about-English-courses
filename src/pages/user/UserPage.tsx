import { Outlet } from 'react-router-dom'

const UserPage = () => {
  return (
    <div>
      {/* tạm thời để debug */}
      <h1>USER PAGE LAYOUT</h1>

      {/* ROUTE CON render ở đây */}
      <Outlet />
    </div>
  )
}

export default UserPage
