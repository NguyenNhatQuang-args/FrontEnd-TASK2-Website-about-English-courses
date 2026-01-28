import { BookIcon, GraduationIcon, UsersIcon } from "../../assets/icons";

export default function TeacherDashboard() {
  return (
    <div>
      <h1 className="page-title">Teacher Dashboard</h1>
      <p className="page-subtitle">Chào mừng giáo viên!</p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>
            <img src={BookIcon} alt="" className="icon" />
            Bài giảng của tôi
          </h3>
          <p className="stat-number success">15</p>
        </div>

        <div className="stat-card">
          <h3>
            <img src={GraduationIcon} alt="" className="icon" />
            Khóa học
          </h3>
          <p className="stat-number info">3</p>
        </div>

        <div className="stat-card">
          <h3>
            <img src={UsersIcon} alt="" className="icon" />
            Học viên
          </h3>
          <p className="stat-number primary">45</p>
        </div>
      </div>
    </div>
  );
}
