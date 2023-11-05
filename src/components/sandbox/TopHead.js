import React, { useState } from 'react'
import { Layout, Button, theme, Dropdown } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, SmileOutlined, DownOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Space } from 'antd'
import { useNavigate } from 'react-router-dom'



export default function TopHead() {


    const { Header } = Layout
    const navigate = useNavigate()


    // 退出登录
    function logout() {
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
    }

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    超级管理员
                </a>
            ),
        },
        {
            key: '4',
            danger: true,
            label: '退出',
            onClick: logout
        },
    ];

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
            }}
        >

            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <div style={{ float: "right" }}>
                <span>欢迎admin回来</span>
                <Dropdown menu={{ items, }}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}
