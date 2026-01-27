import React from "react";
import { Menu, Typography} from "antd";
import type { MenuProps } from "antd";
import styles from "@/styles/SidebarAdmin.module.css"
import { useNavigate ,useLocation } from "react-router-dom";
const { Text } = Typography;


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: "/admin/roles", label: "Quyền" },
    { key: "/admin/accounts", label: "Tài khoản" },
    { key: "/admin/courses", label: "Khóa học" },
    { key: "/admin/classes", label: "Lớp học" },
    {
        key: "sub", 
        label: "Bài học",
        children:[
            {key:"/admin/lessons", label:"Danh sách bài học"},
            {key:"/admin/lessondetails", label: "Chi tiết bài học"}
        ]
    }
];


const SidebarAdmin: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const selectedKey = items
        ?.map((i) => i?.key as string )
        .find((key) => location.pathname.startsWith(key));
    
    return(
        <div className={styles.container}>
            <Text className={styles.title}>Danh mục</Text>
            <div className={styles.menu}>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKey ? [selectedKey] : []}
                    onClick={({ key }) => navigate(key)}
                    items={items}
                />
            </div>
            
        </div>
    );
}

export default SidebarAdmin ;