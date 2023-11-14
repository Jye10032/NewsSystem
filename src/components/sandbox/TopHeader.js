import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Layout, theme, Dropdown, Avatar } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
const { Header } = Layout

function TopHeader(props) {
  const [username, setUsername] = useState('')
  const [roleName, setRoleName] = useState('')
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('token'))
    setRoleName(userInfo.role.roleName)
    setUsername(userInfo.username)
  }, [])
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  // 侧边栏伸缩按钮回调事件
  function changeCollapsed() {
    props.changeCollapsed()
  }
  // 退出登录
  function logout() {
    localStorage.removeItem('token')
    props.history.replace('/login')
  }
  const items = [
    {
      key: '1',
      label: roleName
    },
    {
      key: '2',
      danger: true,
      label: '退出登录',
      onClick: logout
    }
  ]
  return (
    <Header
      style={{
        padding: '0 16px',
        background: colorBgContainer
      }}
    >
      {props.isCollapsible ? (
        <MenuUnfoldOutlined onClick={changeCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={changeCollapsed} />
      )}
      <div style={{ float: 'right' }}>
        <span>
          欢迎<span style={{ color: '#1677ff', margin: '0 5px' }}>{username}</span>回来
        </span>
        <Dropdown
          menu={{
            items
          }}
          arrow
        >
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ marginLeft: '20px' }}
          />
        </Dropdown>
      </div>
    </Header>
  )
}
export default connect(
  (state) => ({
    isCollapsible: state.collapsible
  }),
  {
    changeCollapsed() {
      return {
        type: 'change_collapsed'
        // payload:
      } //action
    }
  }
)(withRouter(TopHeader))
