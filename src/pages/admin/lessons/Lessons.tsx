import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Tag,
  Row,
  Col,
  Empty,
  Table,
  Typography,
  Card,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "@/styles/Accounts.module.css";

type LessonStatus = "ACTIVE" | "INACTIVE";

interface LessonData {
  id: number;
  title: string;
  course: string;
  className: string;
  status: LessonStatus;
}

interface LessonForm {
  title: string;
  course: string;
  className: string;
  status?: LessonStatus;
}

const { Title } = Typography;

const Lessons: React.FC = () => {
  // ===== STATE =====
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null);

  const [createForm] = Form.useForm<LessonForm>();
  const [updateForm] = Form.useForm<LessonForm>();

  // ===== TABLE COLUMNS =====
  const columns: ColumnsType<LessonData> = [
    { title: "#", dataIndex: "id", width: 80 },
    { title: "Tên bài học", dataIndex: "title" },
    { title: "Khóa học", dataIndex: "course" },
    { title: "Lớp học", dataIndex: "className" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      render: (status: LessonStatus) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
  ];

  // ===== UTILS =====
  const getNextId = () => {
    if (lessons.length === 0) return 1;
    return Math.max(...lessons.map((l) => l.id)) + 1;
  };

  // ===== CREATE =====
  const onCreateLesson = (values: LessonForm) => {
    const newLesson: LessonData = {
      id: getNextId(),
      title: values.title,
      course: values.course,
      className: values.className,
      status: "ACTIVE",
    };

    setLessons((prev) => [...prev, newLesson]);
    message.success("Tạo bài học thành công");
    createForm.resetFields();
  };

  // ===== UPDATE =====
  const onUpdateLesson = (values: LessonForm) => {
    if (!selectedLesson) return;

    setLessons((prev) =>
      prev.map((l) =>
        l.id === selectedLesson.id
          ? {
              ...l,
              title: values.title,
              course: values.course,
              className: values.className,
              status: values.status || l.status,
            }
          : l
      )
    );

    message.success("Cập nhật bài học thành công");
    setSelectedLesson(null);
    updateForm.resetFields();
  };

  // ===== SELECT =====
  const handleSelectLesson = (id: number) => {
    const lesson = lessons.find((l) => l.id === id) || null;
    setSelectedLesson(lesson);

    if (lesson) {
      updateForm.setFieldsValue({
        title: lesson.title,
        course: lesson.course,
        className: lesson.className,
        status: lesson.status,
      });
    }
  };

  // ===== RENDER =====
  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        {/* TABLE */}
        <Col span={24}>
          <Card>
            <Title level={4} className={styles.title}>
              Danh sách bài học
            </Title>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={lessons}
              pagination={{ pageSize: 10 }}
              locale={{ emptyText: <Empty description="Chưa có bài học nào" /> }}
              onRow={(record) => ({
                onClick: () => handleSelectLesson(record.id),
              })}
            />
          </Card>
        </Col>

        {/* FORMS */}
        <Col span={24}>
          <Row gutter={24}>
            {/* CREATE */}
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} className={styles.title}>
                  Tạo bài học
                </Title>
                <Form
                  form={createForm}
                  layout="vertical"
                  onFinish={onCreateLesson}
                >
                  <Form.Item
                    name="title"
                    label="Tên bài học"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="course"
                    label="Khóa học"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="className"
                    label="Lớp học"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Button type="primary" htmlType="submit">
                    Tạo bài học
                  </Button>
                </Form>
              </Card>
            </Col>

            {/* UPDATE */}
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} className={styles.title}>
                  Cập nhật bài học
                </Title>
                <Form
                  form={updateForm}
                  layout="vertical"
                  onFinish={onUpdateLesson}
                >
                  <Form.Item label="Chọn bài học">
                    <Select
                      placeholder="Chọn bài học"
                      options={lessons.map((l) => ({
                        value: l.id,
                        label: l.title,
                      }))}
                      onChange={handleSelectLesson}
                    />
                  </Form.Item>

                  <Form.Item
                    name="title"
                    label="Tên bài học"
                    rules={[{ required: true }]}
                  >
                    <Input disabled={!selectedLesson} />
                  </Form.Item>

                  <Form.Item
                    name="course"
                    label="Khóa học"
                    rules={[{ required: true }]}
                  >
                    <Input disabled={!selectedLesson} />
                  </Form.Item>

                  <Form.Item
                    name="className"
                    label="Lớp học"
                    rules={[{ required: true }]}
                  >
                    <Input disabled={!selectedLesson} />
                  </Form.Item>

                  <Form.Item name="status" label="Trạng thái">
                    <Select
                      disabled={!selectedLesson}
                      options={[
                        { value: "ACTIVE", label: "ACTIVE" },
                        { value: "INACTIVE", label: "INACTIVE" },
                      ]}
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!selectedLesson}
                  >
                    Cập nhật
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Lessons;
