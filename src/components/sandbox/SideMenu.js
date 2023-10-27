import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import './index.css'


const { Sider } = Layout
const items = [
    getItem('首页', '/home', <UserOutlined />),
    getItem('Navigation Two', '/user-manage/list', <VideoCameraOutlined />),
    getItem('Navigation Three', 'sub3', <UploadOutlined />),
    getItem('用户管理', 'grp', <UploadOutlined />, [getItem('Option 13', '13'), getItem('Option 14', '14')]),
];

export default function SideMenu() {
    const [collapsed, setCollapsed] = React.useState(false)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const nav = useNavigate();
    const onClick = (item) => {
        nav(item.key)
    };
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" >新闻发布管理系统</div>
            <Menu
                onClick={onClick}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Sider>
    )
}

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
