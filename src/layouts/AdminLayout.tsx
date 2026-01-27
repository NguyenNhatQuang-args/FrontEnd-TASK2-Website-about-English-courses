import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../themes";
import {
  DashboardIcon,
  UsersIcon,
  ShieldIcon,
  LockIcon,
  BookIcon,
  GraduationIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  LogoutIcon,
} from "../assets/icons";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sidebar-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>
            <img src={ShieldIcon} alt="" className="icon" />
            Admin Panel
          </h2>
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-nav-title">Quản lý</p>

          <Link
            to="/admin/dashboard"
            className={`sidebar-link ${isActive("/admin/dashboard") ? "active" : ""}`}
          >
            <img src={DashboardIcon} alt="" className="icon" />
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className={`sidebar-link ${isActive("/admin/users") ? "active" : ""}`}
          >
            <img src={UsersIcon} alt="" className="icon" />
            Quản lý Users
          </Link>

          <Link
            to="/admin/roles"
            className={`sidebar-link ${isActive("/admin/roles") ? "active" : ""}`}
          >
            <img src={LockIcon} alt="" className="icon" />
            Quản lý Roles
          </Link>

          <Link
            to="/admin/permissions"
            className={`sidebar-link ${isActive("/admin/permissions") ? "active" : ""}`}
          >
            <img src={ShieldIcon} alt="" className="icon" />
            Permissions
          </Link>

          <p className="sidebar-nav-title">Nội dung</p>

          <Link
            to="/admin/lessons"
            className={`sidebar-link ${isActive("/admin/lessons") ? "active" : ""}`}
          >
            <img src={BookIcon} alt="" className="icon" />
            Quản lý Lessons
          </Link>

          <Link
            to="/admin/courses"
            className={`sidebar-link ${isActive("/admin/courses") ? "active" : ""}`}
          >
            <img src={GraduationIcon} alt="" className="icon" />
            Quản lý Courses
          </Link>
        </nav>
      </aside>

      <div className="main-content">
        <header className="main-header">
          <h3>Admin Dashboard</h3>

          <div className="header-actions">
            <span className="user-info">
              <img src={UserIcon} alt="" className="icon" />
              {user?.username} ({user?.role})
            </span>

            <button className="theme-toggle-btn" onClick={toggleTheme}>
              <img
                src={themeMode === "light" ? MoonIcon : SunIcon}
                alt=""
                className="icon"
              />
            </button>

            <button className="logout-btn" onClick={handleLogout}>
              <img src={LogoutIcon} alt="" className="icon" />
              Đăng xuất
            </button>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
