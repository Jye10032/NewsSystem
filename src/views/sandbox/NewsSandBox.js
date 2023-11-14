import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import NewsRouter from '../../components/sandbox/NewsRouter'
import './NewsSandBox.scss'
import React, { useEffect } from 'react'
import { Layout, theme } from 'antd'
const { Content } = Layout

export default function NewsSandBox() {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  NProgress.start()
  useEffect(() => {
    NProgress.done()
  })
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow: 'auto'
          }}
        >
          <NewsRouter></NewsRouter>
        </Content>
      </Layout>
    </Layout>
  )
}
