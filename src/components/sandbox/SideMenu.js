import React, { useState, useEffect } from 'react'
import { Layout, Menu, theme } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    HomeOutlined,
    UserOutlined,
    CrownOutlined,
    ContainerOutlined,
    AuditOutlined,
    ExceptionOutlined,
    VideoCameraOutlined,
    UploadOutlined
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
// const menuList = [
//     {
//         key: '/home',
//         title: '首页',
//         icon: <UserOutlined />,
//     },
//     {
//         key: '/user-manage',
//         title: '用户管理',
//         icon: <VideoCameraOutlined />,
//         children: [
//             {
//                 key: '/user-manage/list',
//                 title: '用户列表',
//                 icon: <UserOutlined />,
//             }
//         ]
//     },
//     {
//         key: '/right-manage',
//         title: '权限管理',
//         icon: <UploadOutlined />,
//         children: [
//             {
//                 key: '/right-manage/role/list',
//                 title: '角色列表',
//                 icon: <UserOutlined />,
//             },
//             {
//                 key: '/right-manage/right/list',
//                 title: '权限列表',
//                 icon: <UserOutlined />,

//             }
//         ]
//     },
// ];
const iconList = {
    '/home': <HomeOutlined />,
    '/user-manage': <UserOutlined />,
    '/right-manage': <CrownOutlined />,
    '/news-manage': <ContainerOutlined />,
    '/audit-manage': <AuditOutlined />,
    '/publish-manage': <ExceptionOutlined />
}
export default function SideMenu() {

    const [meun, setMeun] = useState([])
    useEffect(() => {
        axios.get("/rights?_embed=children").then(res => {
            console.log(res.data)
            setMeun(res.data)
        })

    }, [])
    const checkPagePermission = (item) => {
        return item.pagepermisson === 1
    }
    const renderMenu = (meun) => {
        return meun.map(item => {
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
// import './SideMenu.scss'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
// import React, { useEffect, useState } from 'react'
// import { Menu, Layout } from 'antd'
// import {
//     HomeOutlined,
//     UserOutlined,
//     CrownOutlined,
//     ContainerOutlined,
//     AuditOutlined,
//     ExceptionOutlined
// } from '@ant-design/icons'
// import axios from 'axios'
// const { Sider } = Layout

// function SideMenu(props) {
//     const [items, setItems] = useState([])
//     const iconList = {
//         '/home': <HomeOutlined />,
//         '/user-manage': <UserOutlined />,
//         '/right-manage': <CrownOutlined />,
//         '/news-manage': <ContainerOutlined />,
//         '/audit-manage': <AuditOutlined />,
//         '/publish-manage': <ExceptionOutlined />
//     }
//     // 获取用户可查看到的网页
//     useEffect(() => {
//         axios.get('/rights?_embed=children').then((res) => {
//             const list = res.data
//             list.forEach((item) => {
//                 if (item.children.length === 0) item.children = ''
//             })
//             setItems(res.data)
//         })
//     }, [])
//     function obj(key, title, icon, children) {
//         return {
//             key,
//             label: title,
//             icon,
//             children
//         }
//     }
//     // 递归来获得items数组，该数据用为侧边栏数据
//     function dfs(list) {
//         const {
//             role: { rights }
//         } = JSON.parse(localStorage.getItem('token'))
//         const arr = []
//         list.map((item) => {
//             if (item.children && item.children.length !== 0 && rights.includes(item.key)) {
//                 return arr.push(obj(item.key, item.title, iconList[item.key], dfs(item.children)))
//             } else {
//                 return (
//                     item.pagepermisson && rights.includes(item.key) && arr.push(obj(item.key, item.title, iconList[item.key]))
//                 )
//             }
//         })
//         return arr
//     }
//     // 初识选中的菜单项
//     const selectedKeys = [props.location.pathname]
//     // 初始展开的子菜单项
//     const openKeys = ['/' + props.location.pathname.split('/')[1]]
//     return (
//         <Sider
//             trigger={null}
//             collapsible
//             collapsed={props.isCollapsible}
//         >
//             <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
//                 <div className="logo">{!props.isCollapsible && <span>全球新闻发布管理系统</span>}</div>
//                 <Menu
//                     style={{ overflow: 'auto', flex: '1' }}
//                     theme="dark"
//                     mode="inline"
//                     defaultSelectedKeys={selectedKeys}
//                     defaultOpenKeys={openKeys}
//                     items={dfs(items)}
//                     onClick={(e) => props.history.push(e.key)}
//                 />
//             </div>
//         </Sider>
//     )
// }

// export default connect((state) => ({
//     isCollapsible: state.collapsible
// }))(withRouter(SideMenu))
