import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import HeaderAdmin from "@/components/HeaderAdmin";
import SidebarAdmin from "@/components/SidebarAdmin";
const { Header, Sider, Content } = Layout;



const Adminlayout = () => {

    return (
        <Layout>
            <Sider>
                <SidebarAdmin/>
            </Sider>

            <Layout>
                <Header>
                    <HeaderAdmin/>
                </Header>
                <Content>
                    <Outlet></Outlet>
                </Content>
                
            </Layout>
        </Layout>
    )
}

export default Adminlayout;