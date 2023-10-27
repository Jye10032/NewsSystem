import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHead'
import './NewsSandBox.css'

import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import Nopermission from './nopermission/Nopermission'

import { BrowserRouter, Routes, Route, Navigate, redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'

export default function NewsSandBox() {
    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content>

                    <Routes>
                        <Route path="/home" element={<Home />}></Route>
                        <Route path="/user-manage/list" element={<UserList />}></Route>
                        <Route path="/right-manage/role/list" element={<RoleList />}></Route>
                        <Route path="/right-manage/right/list" element={<RightList />}></Route>

                        <Route path="/" element={<Home />}></Route>
                        <Route path="*" element={<Nopermission />} />
                    </Routes>

                </Content>
            </Layout>
        </Layout>
    )
}
