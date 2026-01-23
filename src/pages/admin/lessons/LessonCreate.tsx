import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/admin.css";

const LessonCreate = () => {
  const navigate = useNavigate();

  const [tenBaiHoc, setTenBaiHoc] = useState("");
  const [trinhDo, setTrinhDo] = useState("Beginner");
  const [gia, setGia] = useState<number>(0);
  const [moTa, setMoTa] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ tenBaiHoc, trinhDo, gia, moTa });

    alert("✅ Thêm bài học thành công (demo)");
    navigate("/admin/lessons");
  };

  return (
    <div className="card">
      <h2>➕ Thêm bài học</h2>

      <div style={{ marginBottom: 10 }}>
        <Link to="/admin/lessons">⬅ Quay lại danh sách</Link>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên bài học</label>
          <input
            className="form-control"
            value={tenBaiHoc}
            onChange={(e) => setTenBaiHoc(e.target.value)}
            placeholder="Nhập tên bài học..."
            required
          />
        </div>

        <div className="form-group">
          <label>Trình độ</label>
          <select className="form-control" value={trinhDo} onChange={(e) => setTrinhDo(e.target.value)}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="form-group">
          <label>Giá (VND)</label>
          <input
            className="form-control"
            type="number"
            value={gia}
            onChange={(e) => setGia(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label>Mô tả</label>
          <textarea
            className="form-control"
            value={moTa}
            onChange={(e) => setMoTa(e.target.value)}
            placeholder="Nhập mô tả..."
            rows={4}
          />
        </div>

        <div className="btn-group">
          <button className="btn btn-primary" type="submit">
            Lưu
          </button>

          <Link to="/admin/lessons">
            <button className="btn btn-secondary" type="button">
              Hủy
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LessonCreate;
