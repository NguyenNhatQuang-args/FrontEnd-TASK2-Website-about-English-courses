import React from "react";
import { Menu, Typography} from "antd";
import type { MenuProps } from "antd";
import styles from "@/styles/SidebarAdmin.module.css"
import { useNavigate ,useLocation } from "react-router-dom";
const { Text } = Typography;


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key:"/admin/roles", label: "Quyền",
    },
    {
        key:"/admin/accounts", label:"Tài Khoản",
    }
];

const SidebarAdmin: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const selectedKey = items
        ?.map((i) => i?.key as string )
        .find((key) => location.pathname.startsWith(key));
    
    return(
        <div>
            <Text className={styles.title}>Danh mục</Text>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={selectedKey ? [selectedKey] : []}
                onClick={({ key }) => navigate(key)}
                items={items}
            />
        </div>
    );
}

export default SidebarAdmin ;