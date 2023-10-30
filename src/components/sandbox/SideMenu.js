import React, { useState, useEffect } from 'react'
import { Layout, Menu, theme } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import './index.css'
import axios from 'axios';
import { render } from '@testing-library/react';
const { SubMenu } = Menu

const { Sider } = Layout
// const items = [
//     getItem('首页', '/home', <UserOutlined />),
//     getItem('用户管理', '/user-manage', <VideoCameraOutlined />, [getItem('用户列表', 'user/manege/list')]),
//     getItem('权限管理', '/right-manage', <UploadOutlined />, [getItem('角色列表', '/right-manege/role/list'), getItem('权限列表', '/right-manege/right/list')]),
// ];
const menuList = [
    {
        key: '/home',
        title: '首页',
        icon: <UserOutlined />,
    },
    {
        key: '/user-manage',
        title: '用户管理',
        icon: <VideoCameraOutlined />,
        children: [
            {
                key: '/user-manage/list',
                title: '用户列表',
                icon: <UserOutlined />,
            }
        ]
    },
    {
        key: '/right-manage',
        title: '权限管理',
        icon: <UploadOutlined />,
        children: [
            {
                key: '/right-manage/role/list',
                title: '角色列表',
                icon: <UserOutlined />,
            },
            {
                key: '/right-manage/right/list',
                title: '权限列表',
                icon: <UserOutlined />,

            }
        ]
    },
];
export default function SideMenu() {

    const [meun, setMeun] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children").then(res => {
            console.log(res.data)
            setMeun(res.data)
        })

    }, [])
    const renderMenu = (menuList) => {
        return menuList.map(item => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.key} icon={item.icon} onClick={() => {
                    //props.history.push(item.key)
                    nav(item.key)
                }}>
                    {item.title}
                </Menu.Item>
            )
        })
    }

    const [collapsed, setCollapsed] = React.useState(false)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const nav = useNavigate();
    // const onClick = (menu) => {
    //     nav(menu.key)
    //     getItem(menu)
    // };
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" >新闻发布管理系统</div>
            <Menu
                //onClick={onClick}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}>
                {renderMenu(meun)}
            </Menu>
        </Sider>
    )
}

// function getItem(key, icon, children, label, type) {
//     return {
//         key,
//         icon,
//         children,
//         label,
//         type,
//     };
// }
