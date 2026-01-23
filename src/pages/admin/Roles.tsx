import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Row,
  Col,
  Empty,
  Table,
  Typography,
  Card,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "@/styles/Roles.module.css";

interface Permission {
  id: number;
  name: string;
  description?: string;
}

interface PermissionForm {
  name: string;
  description?: string;
}

const { Title } = Typography;

const Roles: React.FC = () => {

  //Logic tạp thời chưa API ===================================================================================
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

  const [createForm] = Form.useForm<PermissionForm>();
  const [updateForm] = Form.useForm<PermissionForm>();

  const columns: ColumnsType<Permission> = [
    { title: "#", dataIndex: "id", width: 80, fixed: "left" },
    { title: "Tên quyền", dataIndex: "name" },
    { title: "Mô tả", dataIndex: "description", ellipsis: true },
  ];

  
  const getNextId = () => {
    if (permissions.length === 0) return 1;
    return Math.max(...permissions.map(p => p.id)) + 1;
  };

  const onCreatePermission = (values: PermissionForm) => {
    const newPermission: Permission = {
      id: getNextId(),
      ...values,
    };
    setPermissions((prev) => [...prev, newPermission]);
    message.success("Tạo quyền thành công");
    createForm.resetFields();
  };

  const onUpdatePermission = (values: PermissionForm) => {
    if (!selectedPermission) return;

    setPermissions((prev) =>
      prev.map((p) =>
        p.id === selectedPermission.id ? { ...p, ...values } : p
      )
    );

    message.success("Cập nhật quyền thành công");
    setSelectedPermission(null);
    updateForm.resetFields();
  };

  const handleSelectPermission = (id: number) => {
    const permission = permissions.find((p) => p.id === id) || null;
    setSelectedPermission(permission);
    if (permission) updateForm.setFieldsValue(permission);
  };
//=============================================================================
  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Title level={4} className={styles.title}>
              Danh sách quyền
            </Title>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={permissions}
              pagination={{ pageSize: 10 }}
              sticky
              locale={{ emptyText: <Empty description="Chưa có quyền nào" /> }}
              onRow={(record) => ({
                onClick: () => handleSelectPermission(record.id),
              })}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} className={styles.title}>
                  Tạo quyền mới
                </Title>
                <Form form={createForm} layout="vertical" onFinish={onCreatePermission}>
                  <Form.Item name="name" label="Tên quyền" rules={[{ required: true, message: "Vui lòng nhập tên quyền" }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="description" label="Mô tả">
                    <Input.TextArea rows={3} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" className={styles.submitButton}>
                    Tạo quyền
                  </Button>
                </Form>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card >
                <Title level={4} className={styles.title}>
                  Cập nhật quyền
                </Title>
                <Form form={updateForm} layout="vertical" onFinish={onUpdatePermission}>
                  <Form.Item label="Chọn quyền cần sửa">
                    <Select
                      placeholder="Chọn một quyền"
                      options={permissions.map((p) => ({ value: p.id, label: p.name }))}
                      onChange={handleSelectPermission}
                    />
                  </Form.Item>
                  <Form.Item name="name" label="Tên quyền" rules={[{ required: true }]}>
                    <Input disabled={!selectedPermission} />
                  </Form.Item>
                  <Form.Item name="description" label="Mô tả">
                    <Input.TextArea rows={3} disabled={!selectedPermission} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" disabled={!selectedPermission} className={styles.submitButton}>
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

export default Roles;