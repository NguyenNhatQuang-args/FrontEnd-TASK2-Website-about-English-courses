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

type ClassStatus = "ACTIVE" | "INACTIVE";

interface ClassData {
  id: number;
  name: string;
  description: string;
  status: ClassStatus;
}

interface ClassForm {
  name: string;
  description: string;
  status?: ClassStatus;
}

const { Title } = Typography;

const Classes: React.FC = () => {
  // ===== LOGIC tạm thời chưa API =====
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

  const [createForm] = Form.useForm<ClassForm>();
  const [updateForm] = Form.useForm<ClassForm>();

  const columns: ColumnsType<ClassData> = [
    { title: "#", dataIndex: "id", width: 80 },
    { title: "Tên lớp học", dataIndex: "name" },
    { title: "Mô tả", dataIndex: "description", ellipsis: true },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      render: (status: ClassStatus) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
  ];

  const getNextId = () => {
    if (classes.length === 0) return 1;
    return Math.max(...classes.map((c) => c.id)) + 1;
  };

  const onCreateClass = (values: ClassForm) => {
    const newClass: ClassData = {
      id: getNextId(),
      name: values.name,
      description: values.description,
      status: "ACTIVE",
    };

    setClasses((prev) => [...prev, newClass]);
    message.success("Tạo lớp học thành công");
    createForm.resetFields();
  };

  const onUpdateClass = (values: ClassForm) => {
    if (!selectedClass) return;

    setClasses((prev) =>
      prev.map((c) =>
        c.id === selectedClass.id
          ? {
              ...c,
              name: values.name,
              description: values.description,
              status: values.status || c.status,
            }
          : c
      )
    );

    message.success("Cập nhật lớp học thành công");
    setSelectedClass(null);
    updateForm.resetFields();
  };

  const handleSelectClass = (id: number) => {
    const cls = classes.find((c) => c.id === id) || null;
    setSelectedClass(cls);

    if (cls) {
      updateForm.setFieldsValue({
        name: cls.name,
        description: cls.description,
        status: cls.status,
      });
    }
  };

  
  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Title level={4} className={styles.title}>
              Danh sách lớp học
            </Title>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={classes}
              pagination={{ pageSize: 10 }}
              locale={{ emptyText: <Empty description="Chưa có lớp học nào" /> }}
              onRow={(record) => ({
                onClick: () => handleSelectClass(record.id),
              })}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Row gutter={24}>
            {/* Tạo lớp học */}
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} className={styles.title}>
                  Tạo lớp học
                </Title>
                <Form form={createForm} layout="vertical" onFinish={onCreateClass}>
                  <Form.Item
                    name="name"
                    label="Tên lớp học"
                    rules={[{ required: true, message: "Vui lòng nhập tên lớp" }]}
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
                    Tạo lớp học
                  </Button>
                </Form>
              </Card>
            </Col>

            {/* Cập nhật lớp học */}
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} className={styles.title}>
                  Cập nhật lớp học
                </Title>
                <Form form={updateForm} layout="vertical" onFinish={onUpdateClass}>
                  <Form.Item label="Chọn lớp học">
                    <Select
                      placeholder="Chọn lớp"
                      options={classes.map((c) => ({
                        value: c.id,
                        label: c.name,
                      }))}
                      onChange={handleSelectClass}
                    />
                  </Form.Item>

                  <Form.Item
                    name="name"
                    label="Tên lớp học"
                    rules={[{ required: true }]}
                  >
                    <Input disabled={!selectedClass} />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea rows={3} disabled={!selectedClass} />
                  </Form.Item>

                  <Form.Item name="status" label="Trạng thái">
                    <Select
                      disabled={!selectedClass}
                      options={[
                        { value: "ACTIVE", label: "ACTIVE" },
                        { value: "INACTIVE", label: "INACTIVE" },
                      ]}
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!selectedClass}
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

export default Classes