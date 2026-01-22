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
import styles from "../styles/Accounts.module.css";

type UserRole = "ADMIN" | "TEACHER" | "STUDENT";
type UserStatus = "ACTIVE" | "INACTIVE";

interface UserData {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

interface UserForm {
  username: string;
  email: string;
  password?: string;
  role: UserRole;
  status?: UserStatus;
}

const { Title } = Typography;

const Accounts: React.FC = () => {
  // LOGIC tạp thời chưa API=========================================================================================
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const [createForm] = Form.useForm<UserForm>();
  const [updateForm] = Form.useForm<UserForm>();

  const columns: ColumnsType<UserData> = [
    { title: "#", dataIndex: "id", width: 80, fixed: "left" },
    { title: "Tên", dataIndex: "username" },
    { title: "Email", dataIndex: "email", ellipsis: true },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
      render: (role: UserRole) => (
        <Tag color={role === "ADMIN" ? "volcano" : role === "TEACHER" ? "geekblue" : "green"}>
          {role}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      render: (status: UserStatus) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
  ];

  
  const getNextId = () => {
    if (users.length === 0) return 1;
    return Math.max(...users.map(u => u.id)) + 1;
  };

  const onCreateUser = (values: UserForm) => {
    const newUser: UserData = {
      id: getNextId(),
      username: values.username,
      email: values.email,
      role: values.role,
      status: "ACTIVE",
    };
    setUsers((prev) => [...prev, newUser]);
    message.success("Tạo tài khoản thành công");
    createForm.resetFields();
  };

  const onUpdateUser = (values: UserForm) => {
    if (!selectedUser) return;

    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? { ...u, username: values.username, email: values.email, role: values.role, status: values.status || u.status }
          : u
      )
    );

    message.success("Cập nhật tài khoản thành công");
    setSelectedUser(null);
    updateForm.resetFields();
  };

  const handleSelectUser = (id: number) => {
    const user = users.find((u) => u.id === id) || null;
    setSelectedUser(user);
    if (user) {
      updateForm.setFieldsValue({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  };
  //=================================================================================================================================================
  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Title level={4} className={styles.title}>
              Danh sách tài khoản
            </Title>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={users}
              pagination={{ pageSize: 10 }}
              sticky
              locale={{ emptyText: <Empty description="Chưa có tài khoản nào" /> }}
              onRow={(record) => ({
                onClick: () => handleSelectUser(record.id),
              })}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Card >
                <Title level={4} className={styles.title}>
                  Tạo tài khoản
                </Title>
                <Form form={createForm} layout="vertical" onFinish={onCreateUser}>
                  <Form.Item name="username" label="Tên" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                    <Input.Password />
                  </Form.Item>
                  <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                    <Select
                      options={[
                        { value: "ADMIN", label: "ADMIN" },
                        { value: "TEACHER", label: "TEACHER" },
                        { value: "STUDENT", label: "STUDENT" },
                      ]}
                    />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" className={styles.submitButton}>
                    Tạo tài khoản
                  </Button>
                </Form>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card>
                <Title level={4} className={styles.title}>
                  Cập nhật tài khoản
                </Title>
                <Form form={updateForm} layout="vertical" onFinish={onUpdateUser}>
                  <Form.Item label="Chọn tài khoản">
                    <Select
                      placeholder="Chọn user"
                      options={users.map((u) => ({ value: u.id, label: u.username }))}
                      onChange={handleSelectUser}
                    />
                  </Form.Item>
                  <Form.Item name="username" label="Tên" rules={[{ required: true }]}>
                    <Input disabled={!selectedUser} />
                  </Form.Item>
                  <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                    <Input disabled={!selectedUser} />
                  </Form.Item>
                  <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                    <Select
                      disabled={!selectedUser}
                      options={[
                        { value: "ADMIN", label: "ADMIN" },
                        { value: "TEACHER", label: "TEACHER" },
                        { value: "STUDENT", label: "STUDENT" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item name="status" label="Trạng thái">
                    <Select
                      disabled={!selectedUser}
                      options={[
                        { value: "ACTIVE", label: "ACTIVE" },
                        { value: "INACTIVE", label: "INACTIVE" },
                      ]}
                    />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" disabled={!selectedUser} className={styles.submitButton}>
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

export default Accounts;