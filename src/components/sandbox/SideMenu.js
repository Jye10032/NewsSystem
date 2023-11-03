import React, { useState, useEffect } from 'react'
import { Layout, Menu, theme } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
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
const iconList = {
    "/home": <UserOutlined />,
    "/user-manage/list": <VideoCameraOutlined />,
    "/right-manage": <UploadOutlined />,
    "/right-manage/role/list": <UserOutlined />,
    "/right-manage/right/list": <UserOutlined />,
    //...
}
export default function SideMenu() {

    const [meun, setMeun] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children").then(res => {
            console.log(res.data)
            setMeun(res.data)
        })

    }, [])
    const checkPagePermission = (item) => {
        return item.pagepermisson === 1
    }
    const renderMenu = (menuList) => {
        return menuList.map(item => {
            if (item.children?.length > 0 && checkPagePermission(item)) {
                return (
                    <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
                        {renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return checkPagePermission(item) && (
                <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => {
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



    //跳转路径
    const nav = useNavigate();
    //console.log(useLocation().pathname)

    //选中的key
    const selectKeys = [useLocation().pathname]

    //展开列表的key
    const openKeys = ["/" + useLocation().pathname.split("/")[1]]

    // const onClick = (menu) => {
    //     nav(menu.key)
    //     getItem(menu)
    // };
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={{/*设置范围 滚动条*/ display: "flex", height: "100%", flexDirection: "column" }}>

                <div className="demo-logo-vertical" >新闻发布管理系统</div>
                <div style={{ flex: 1, "overflow": "auto" }}>
                    <Menu
                        //onClick={onClick}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={selectKeys}
                        defaultOpenKeys={openKeys}>
                        {renderMenu(meun)}
                    </Menu>
                </div>
            </div>
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
