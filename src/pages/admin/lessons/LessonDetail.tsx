import { Link, useParams } from "react-router-dom";
import "../../../styles/admin.css";

const LessonDetail = () => {
  const { id } = useParams();

  // Demo data (sau này nối API)
  const lesson = {
    id,
    tenBaiHoc: "Tiếng Anh cơ bản",
    trinhDo: "Beginner",
    gia: 199000,
    moTa: "Mô tả demo cho bài học.",
  };

  return (
    <div className="card">
      <h2>📌 Chi tiết bài học</h2>

      <Link className="back-link" to="/admin/lessons">
        ⬅ Quay lại danh sách
      </Link>

      <div style={{ marginTop: 12, lineHeight: 2 }}>
        <p>
          <b>ID:</b> {lesson.id}
        </p>
        <p>
          <b>Tên bài học:</b> {lesson.tenBaiHoc}
        </p>
        <p>
          <b>Trình độ:</b> {lesson.trinhDo}
        </p>
        <p>
          <b>Giá:</b> {lesson.gia.toLocaleString("vi-VN")}đ
        </p>
        <p>
          <b>Mô tả:</b> {lesson.moTa}
        </p>
      </div>

      <div className="btn-group" style={{ marginTop: 16 }}>
        <Link to={`/admin/lessons/edit/${lesson.id}`}>
          <button className="btn btn-primary">✏️ Sửa</button>
        </Link>

        <Link to="/admin/lessons">
          <button className="btn btn-secondary">Đóng</button>
        </Link>
      </div>
    </div>
  );
};

export default LessonDetail;
