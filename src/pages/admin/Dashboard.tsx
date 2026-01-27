import { UsersIcon, BookIcon, GraduationIcon } from "../../assets/icons";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-subtitle">Chào mừng đến trang quản trị!</p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>
            <img src={UsersIcon} alt="" className="icon" />
            Users
          </h3>
          <p className="stat-number primary">150</p>
        </div>

        <div className="stat-card">
          <h3>
            <img src={BookIcon} alt="" className="icon" />
            Lessons
          </h3>
          <p className="stat-number info">45</p>
        </div>

        <div className="stat-card">
          <h3>
            <img src={GraduationIcon} alt="" className="icon" />
            Courses
          </h3>
          <p className="stat-number success">12</p>
        </div>

        <div className="stat-card">
          <h3>
            <img src={UsersIcon} alt="" className="icon" />
            Teachers
          </h3>
          <p className="stat-number warning">8</p>
        </div>
      </div>
    </div>
  );
}
