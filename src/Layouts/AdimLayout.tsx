import { Link, Outlet } from "react-router-dom";
import "../styles/admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="logo">🎯 Quản trị</div>

        <nav className="admin-menu">
          <Link className="admin-link" to="/admin/lessons">
            📚 Quản lý bài học
          </Link>

          <Link className="admin-link" to="/admin/lessons/create">
            ➕ Thêm bài học
          </Link>
        </nav>
      </aside>

      <div className="admin-main">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
