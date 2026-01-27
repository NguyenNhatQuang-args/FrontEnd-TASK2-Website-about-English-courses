import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../themes";
import {
  GraduationIcon,
  HomeIcon,
  BookIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  LogoutIcon,
} from "../assets/icons";

export default function UserLayout() {
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
    <div className="user-layout">
      <header className="user-header">
        <div className="user-logo">
          <img src={GraduationIcon} alt="" className="icon" />
          <h2>English Courses</h2>
        </div>

        <nav className="user-nav">
          <Link
            to="/home"
            className={`user-nav-link ${isActive("/home") ? "active" : ""}`}
          >
            <img src={HomeIcon} alt="" className="icon icon-sm" />
            Trang chủ
          </Link>
          <Link
            to="/courses"
            className={`user-nav-link ${isActive("/courses") ? "active" : ""}`}
          >
            <img src={BookIcon} alt="" className="icon icon-sm" />
            Khóa học
          </Link>
          <Link
            to="/my-courses"
            className={`user-nav-link ${isActive("/my-courses") ? "active" : ""}`}
          >
            <img src={GraduationIcon} alt="" className="icon icon-sm" />
            Khóa học của tôi
          </Link>
          <Link
            to="/profile"
            className={`user-nav-link ${isActive("/profile") ? "active" : ""}`}
          >
            <img src={UserIcon} alt="" className="icon icon-sm" />
            Hồ sơ
          </Link>
        </nav>

        <div className="user-header-actions">
          <span className="user-info">
            <img src={UserIcon} alt="" className="icon" />
            {user?.username}
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

      <main className="user-main">
        <Outlet />
      </main>

      <footer className="user-footer">
        <p>© 2024 English Courses. All rights reserved.</p>
      </footer>
    </div>
  );
}
