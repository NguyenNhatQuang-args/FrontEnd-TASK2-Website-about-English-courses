import { Link } from "react-router-dom";
import "../../../styles/admin.css";

type Lesson = {
  id: number;
  tenBaiHoc: string;
  trinhDo: string;
  gia: number;
};

const fakeLessons: Lesson[] = [
  { id: 1, tenBaiHoc: "Tiếng Anh cơ bản", trinhDo: "Beginner", gia: 199000 },
  { id: 2, tenBaiHoc: "Giao tiếp tiếng Anh", trinhDo: "Intermediate", gia: 299000 },
  { id: 3, tenBaiHoc: "IELTS Foundation", trinhDo: "Advanced", gia: 499000 },
];

const LessonList = () => {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>📚 Danh sách bài học</h2>

        <Link to="/admin/lessons/create">
          <button className="btn btn-primary">➕ Thêm bài học</button>
        </Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên bài học</th>
            <th>Trình độ</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {fakeLessons.map((lesson) => (
            <tr key={lesson.id}>
              <td>{lesson.id}</td>
              <td>{lesson.tenBaiHoc}</td>
              <td>{lesson.trinhDo}</td>
              <td>{lesson.gia.toLocaleString("vi-VN")}đ</td>
              <td>
                <div className="btn-group">
                  <Link to={`/admin/lessons/${lesson.id}`}>
                    <button className="btn btn-secondary">Xem</button>
                  </Link>

                  <Link to={`/admin/lessons/edit/${lesson.id}`}>
                    <button className="btn btn-primary">Sửa</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LessonList;
