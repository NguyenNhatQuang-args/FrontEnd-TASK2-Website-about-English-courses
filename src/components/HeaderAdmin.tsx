import { Avatar, Space, Dropdown, Switch ,Typography } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useTheme } from "@/context/ThemeContext";
import styles from '@/styles/HeaderAdmin.module.css'
const { Text } = Typography;

const HeaderAdmin: React.FC = () => {

    const {darkMode, toggleTheme} = useTheme();

    const handleOut=() => {
        alert("Đa dăng xuất")
    }

    const menuItems:MenuProps['items'] = [
        {
            key: "info",
            label: (
                <div>
                    <Text strong> Tên tài khoản</Text>
                    <br />
                    <Text type="secondary"> Thông tin tài khoản</Text>
                </div>
            ),
            disabled: true
        },

        {
            type: 'divider',
        },

        {
            key:"Theme",
            label:(
                <Space>
                    <span>Nền tối</span>
                    <Switch 
                        checked= {darkMode}
                        onChange={toggleTheme}
                        size="small"
                    />
                </Space>
            ),
        },

        {
            type:'divider'
        },

        {
            key:'logout',
            icon: <LogoutOutlined/>,
            label:'Đăng xuất',
            onClick: handleOut,
        }
    ]

    return (
        <div className={styles.container}>
            <Text className={styles.text}>
                Admin-Dashboard
            </Text>
        
            <Dropdown menu={{items: menuItems}} trigger={['click']}>
                <Avatar
                    icon={<UserOutlined/>}
                />
            </Dropdown>
        </div>
    );
}

export default HeaderAdmin;

