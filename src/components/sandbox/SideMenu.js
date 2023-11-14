import './SideMenu.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Menu, Layout } from 'antd'
import {
  HomeOutlined,
  UserOutlined,
  CrownOutlined,
  ContainerOutlined,
  AuditOutlined,
  ExceptionOutlined
} from '@ant-design/icons'
import axios from 'axios'
const { Sider } = Layout

function SideMenu(props) {
  const [items, setItems] = useState([])
  const iconList = {
    '/home': <HomeOutlined />,
    '/user-manage': <UserOutlined />,
    '/right-manage': <CrownOutlined />,
    '/news-manage': <ContainerOutlined />,
    '/audit-manage': <AuditOutlined />,
    '/publish-manage': <ExceptionOutlined />
  }
  // 获取用户可查看到的网页
  useEffect(() => {
    axios.get('/rights?_embed=children').then((res) => {
      const list = res.data
      list.forEach((item) => {
        if (item.children.length === 0) item.children = ''
      })
      setItems(res.data)
    })
  }, [])
  function obj(key, title, icon, children) {
    return {
      key,
      label: title,
      icon,
      children
    }
  }
  // 递归来获得items数组，该数据用为侧边栏数据
  function dfs(list) {
    const {
      role: { rights }
    } = JSON.parse(localStorage.getItem('token'))
    const arr = []
    list.map((item) => {
      if (item.children && item.children.length !== 0 && rights.includes(item.key)) {
        return arr.push(obj(item.key, item.title, iconList[item.key], dfs(item.children)))
      } else {
        return (
          item.pagepermisson && rights.includes(item.key) && arr.push(obj(item.key, item.title, iconList[item.key]))
        )
      }
    })
    return arr
  }
  // 初识选中的菜单项
  const selectedKeys = [props.location.pathname]
  // 初始展开的子菜单项
  const openKeys = ['/' + props.location.pathname.split('/')[1]]
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.isCollapsible}
    >
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="logo">{!props.isCollapsible && <span>全球新闻发布管理系统</span>}</div>
        <Menu
          style={{ overflow: 'auto', flex: '1' }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          items={dfs(items)}
          onClick={(e) => props.history.push(e.key)}
        />
      </div>
    </Sider>
  )
}

export default connect((state) => ({
  isCollapsible: state.collapsible
}))(withRouter(SideMenu))
