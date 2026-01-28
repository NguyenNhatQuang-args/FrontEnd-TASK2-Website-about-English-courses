import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../themes";
import {
  DashboardIcon,
  BookIcon,
  GraduationIcon,
  UsersIcon,
  PlusIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  LogoutIcon,
} from "../assets/icons";

export default function TeacherLayout() {
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
      <aside className="sidebar" style={{ backgroundColor: "#16213e" }}>
        <div className="sidebar-logo">
          <h2>
            <img src={BookIcon} alt="" className="icon" />
            Teacher Portal
          </h2>
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-nav-title">Giảng dạy</p>

          <Link
            to="/teacher/dashboard"
            className={`sidebar-link ${isActive("/teacher/dashboard") ? "active" : ""}`}
          >
            <img src={DashboardIcon} alt="" className="icon" />
            Dashboard
          </Link>

          <Link
            to="/teacher/lessons"
            className={`sidebar-link ${isActive("/teacher/lessons") ? "active" : ""}`}
          >
            <img src={BookIcon} alt="" className="icon" />
            Bài giảng của tôi
          </Link>

          <Link
            to="/teacher/lessons/create"
            className={`sidebar-link ${isActive("/teacher/lessons/create") ? "active" : ""}`}
          >
            <img src={PlusIcon} alt="" className="icon" />
            Tạo bài giảng mới
          </Link>

          <p className="sidebar-nav-title">Khóa học</p>

          <Link
            to="/teacher/courses"
            className={`sidebar-link ${isActive("/teacher/courses") ? "active" : ""}`}
          >
            <img src={GraduationIcon} alt="" className="icon" />
            Khóa học của tôi
          </Link>

          <Link
            to="/teacher/students"
            className={`sidebar-link ${isActive("/teacher/students") ? "active" : ""}`}
          >
            <img src={UsersIcon} alt="" className="icon" />
            Học viên
          </Link>
        </nav>
      </aside>

      <div className="main-content">
        <header className="main-header">
          <h3>Teacher Portal</h3>

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
