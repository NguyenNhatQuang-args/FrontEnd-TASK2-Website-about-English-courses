import { Card, Typography, Table, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "@/styles/Accounts.module.css";

const { Title } = Typography;

interface LessonDetail {
  id: number;
  lessonTitle: string;
  content: string;
  videoUrl: string;
}

const LessonDetails: React.FC = () => {
  const data: LessonDetail[] = [];

  const columns: ColumnsType<LessonDetail> = [
    { title: "#", dataIndex: "id", width: 80 },
    { title: "Bài học", dataIndex: "lessonTitle" },
    { title: "Nội dung", dataIndex: "content", ellipsis: true },
    { title: "Video", dataIndex: "videoUrl" },
  ];

  return (
    <div className={styles.container}>
      <Card>
        <Title level={4} className={styles.title}>
          Danh sách chi tiết bài học
        </Title>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          locale={{ emptyText: <Empty description="Chưa có dữ liệu chi tiết bài học" /> }}
        />
      </Card>
    </div>
  );
};

export default LessonDetails;
