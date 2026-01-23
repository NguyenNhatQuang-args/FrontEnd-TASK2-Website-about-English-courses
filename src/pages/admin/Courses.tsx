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

type CourseStatus = "ACTIVE" | "INACTIVE";

interface CourseData {
  id: number;
  title: string;
  description: string;
  status: CourseStatus;
}

interface CourseForm {
  title: string;
  description: string;
  status?: CourseStatus;
}

const { Title } = Typography;

const Courses: React.FC = () => {
  // ===== LOGIC tạm thời chưa API =====
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

  const [createForm] = Form.useForm<CourseForm>();
  const [updateForm] = Form.useForm<CourseForm>();

  const columns: ColumnsType<CourseData> = [
    { title: "#", dataIndex: "id", width: 80 },
    { title: "Tên khóa học", dataIndex: "title" },
    { title: "Mô tả", dataIndex: "description", ellipsis: true },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      render: (status: CourseStatus) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
  ];

  const getNextId = () => {
    if (courses.length === 0) return 1;
    return Math.max(...courses.map((c) => c.id)) + 1;
  };

  const onCreateCourse = (values: CourseForm) => {
    const newCourse: CourseData = {
      id: getNextId(),
      title: values.title,
      description: values.description,
      status: "ACTIVE",
    };

    setCourses((prev) => [...prev, newCourse]);
    message.success("Tạo khóa học thành công");
    createForm.resetFields();
  };

  const onUpdateCourse = (values: CourseForm) => {
    if (!selectedCourse) return;

    setCourses((prev) =>
      prev.map((c) =>
        c.id === selectedCourse.id
          ? {
              ...c,
              title: values.title,
              description: values.description,
              status: values.status || c.status,
            }
          : c
      )
    );

    message.success("Cập nhật khóa học thành công");
    setSelectedCourse(null);
    updateForm.resetFields();
  };

  const handleSelectCourse = (id: number) => {
    const course = courses.find((c) => c.id === id) || null;
    setSelectedCourse(course);

    if (course) {
      updateForm.setFieldsValue({
        title: course.title,
        description: course.description,
        status: course.status,
      });
    }
  };

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Title level={4} className={styles.title}>
              Danh sách khóa học
            </Title>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={courses}
              pagination={{ pageSize: 10 }}
              locale={{ emptyText: <Empty description="Chưa có khóa học nào" /> }}
              onRow={(record) => ({
                onClick: () => handleSelectCourse(record.id),
              })}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Row gutter={24}>
            {/* Tạo khóa học */}
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} className={styles.title}>
                  Tạo khóa học
                </Title>
                <Form form={createForm} layout="vertical" onFinish={onCreateCourse}>
                  <Form.Item
                    name="title"
                    label="Tên khóa học"
                    rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                  >
                    <Input.TextArea rows={3} />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" className={styles.submitButton}>
                    Tạo khóa học
                  </Button>
                </Form>
              </Card>
            </Col>

            {/* Cập nhật khóa học */}
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} className={styles.title}>
                  Cập nhật khóa học
                </Title>
                <Form form={updateForm} layout="vertical" onFinish={onUpdateCourse}>
                  <Form.Item label="Chọn khóa học">
                    <Select
                      placeholder="Chọn khóa học"
                      options={courses.map((c) => ({
                        value: c.id,
                        label: c.title,
                      }))}
                      onChange={handleSelectCourse}
                    />
                  </Form.Item>

                  <Form.Item
                    name="title"
                    label="Tên khóa học"
                    rules={[{ required: true }]}
                  >
                    <Input disabled={!selectedCourse} />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea rows={3} disabled={!selectedCourse} />
                  </Form.Item>

                  <Form.Item name="status" label="Trạng thái">
                    <Select
                      disabled={!selectedCourse}
                      options={[
                        { value: "ACTIVE", label: "ACTIVE" },
                        { value: "INACTIVE", label: "INACTIVE" },
                      ]}
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!selectedCourse}
                    className={styles.submitButton}
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

export default Courses;
