import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, message, Popover, Switch } from 'antd'
import axios from 'axios'
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
const { confirm } = Modal

export default function RightList() {
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    axios.get('/rights?_embed=children').then((res) => {
      const list = res.data
      list.forEach((item) => {
        if (item.children.length === 0) return (item.children = '')
      })
      setDataSource(list)
    })
  }, [])

  function confirmMethod(item) {
    confirm({
      title: '警告',
      icon: <ExclamationCircleFilled />,
      content: '是否删除该权限?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteRole(item)
      },
      onCancel() {}
    })
  }

  function deleteRole(item) {
    if (item.grade === 1) {
      let list = dataSource.filter((role) => {
        return role.id !== item.id
      })
      // axios.delete(`/rights/${item.id}`).then(
      //   (res) => {
      //     setDataSource([...list])
      //     message.success('删除成功')
      //   },
      //   (err) => {
      //     message.error('删除失败')
      //   }
      // )
      setDataSource([...list])
      message.success('删除成功')
    } else {
      let list = dataSource.filter((role) => {
        return role.id === item.rightId
      })
      list[0].children = list[0].children.filter((role) => {
        return role.id !== item.id
      })

      // axios.delete(`/children/${item.id}`).then(
      //   (res) => {
      //     setDataSource([...dataSource])
      //     message.success('删除成功')
      //   },
      //   (err) => {
      //     message.error('删除失败')
      //   }
      // )
      setDataSource([...dataSource])
      message.success('删除成功')
    }
  }

  function switchMethod(item) {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setDataSource([...dataSource])
    if (item.grade === 1) {
      axios.patch(`/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    } else {
      axios.patch(`/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '权限名称',
      dataIndex: 'title'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key, _) => {
        if (_.grade === 1) {
          return <Tag color="success">{key}</Tag>
        } else {
          return <Tag color="warning">{key}</Tag>
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'grade',
      render: (_, item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              style={{
                marginRight: '10px'
              }}
              onClick={() => confirmMethod(item)}
            />
            <Popover
              content={
                <div style={{ textAlign: 'center' }}>
                  <Switch
                    checked={item.pagepermisson}
                    onChange={() => switchMethod(item)}
                  />
                </div>
              }
              title="页面配置项"
              trigger={item.pagepermisson === undefined ? '' : 'click'}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                disabled={item.pagepermisson === undefined}
              />
            </Popover>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5
        }}
      />
    </div>
  )
}
