export default function UserHome() {
  return (
    <div className="home-container">
      <h1 className="home-title">Chào mừng đến với English Courses!</h1>
      <p className="home-subtitle">Khám phá các khóa học tiếng Anh chất lượng cao.</p>

      <div className="featured-section">
        <h2 className="featured-title">Khóa học nổi bật</h2>

        <div className="courses-grid">
          <div className="course-card">
            <h3>TOEIC 700+</h3>
            <p>Luyện thi TOEIC đạt 700+ điểm</p>
            <button className="enroll-btn">Xem chi tiết</button>
          </div>

          <div className="course-card">
            <h3>Giao tiếp cơ bản</h3>
            <p>Học tiếng Anh giao tiếp từ đầu</p>
            <button className="enroll-btn">Xem chi tiết</button>
          </div>

          <div className="course-card">
            <h3>IELTS Writing</h3>
            <p>Kỹ năng viết IELTS band 6.5+</p>
            <button className="enroll-btn">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  );
}
