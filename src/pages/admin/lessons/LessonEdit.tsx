import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../styles/admin.css";

const LessonEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tenBaiHoc, setTenBaiHoc] = useState("");
  const [trinhDo, setTrinhDo] = useState("Beginner");
  const [gia, setGia] = useState<number>(0);
  const [moTa, setMoTa] = useState("");

  // Demo load data theo id
  useEffect(() => {
    if (!id) return;

    setTenBaiHoc("Tiếng Anh cơ bản");
    setTrinhDo("Beginner");
    setGia(199000);
    setMoTa("Mô tả demo cho bài học cần cập nhật.");
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Update lesson:", { id, tenBaiHoc, trinhDo, gia, moTa });
    alert("✅ Cập nhật bài học thành công (demo)");
    navigate("/admin/lessons");
  };

  return (
    <div className="card">
      <h2>✏️ Cập nhật bài học</h2>

      <Link className="back-link" to="/admin/lessons">
        ⬅ Quay lại danh sách
      </Link>

      <p style={{ marginTop: 10 }}>
        Đang sửa bài học ID: <b>{id}</b>
      </p>

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
          <select
            className="form-control"
            value={trinhDo}
            onChange={(e) => setTrinhDo(e.target.value)}
          >
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

          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {
              const ok = confirm("Bạn có chắc muốn xoá bài học này không?");
              if (ok) {
                alert("🗑️ Xoá bài học thành công (demo)");
                navigate("/admin/lessons");
              }
            }}
          >
            Xoá
          </button>

          <Link to="/admin/lessons">
            <button className="btn btn-secondary" type="button">
              Huỷ
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LessonEdit;
