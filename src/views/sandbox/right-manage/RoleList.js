import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, message, Tree } from 'antd'
import axios from 'axios'
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
const { confirm } = Modal

export default function RoleList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [currentKeys, setCurrentKeys] = useState([])
  const [currentId, setCurrentId] = useState(0)
  const [rightslist, setRightslist] = useState([])
  useEffect(() => {
    axios.get('/roles').then((res) => {
      setDataSource(res.data)
    })
    axios.get('/rights?_embed=children').then((res) => {
      setRightslist(res.data)
    })
  }, [])

  function confirmMethod(item) {
    confirm({
      title: '警告',
      icon: <ExclamationCircleFilled />,
      content: '是否删除该角色?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteRole(item)
      },
      onCancel() {}
    })
  }

  function deleteRole(item) {
    let list = dataSource.filter((role) => {
      return role.id !== item.id
    })
    axios.delete(`/roles/${item.id}`).then(
      (res) => {
        setDataSource([...list])
        message.success('删除成功')
      },
      (err) => {
        message.error('删除失败')
      }
    )
    // setDataSource([...list])
    // message.success('删除成功')
  }

  function onCheck(checkedKeys) {
    setCurrentKeys(checkedKeys)
  }

  function handleOk() {
    setDataSource(
      dataSource.map((item) => {
        if (item.id === currentId) {
          return {
            ...item,
            rights: currentKeys
          }
        } else {
          return item
        }
      })
    )
    axios
      .patch(`/roles/${currentId}`, {
        rights: currentKeys
      })
      .then(
        (res) => {
          message.success('修改成功')
        },
        (err) => {
          message.error('修改失败')
        }
      )
    setIsModalOpen(!isModalOpen)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '角色名称',
      dataIndex: 'roleName'
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
            <Button
              shape="circle"
              icon={<EditOutlined />}
              type="primary"
              style={{
                marginRight: '10px'
              }}
              onClick={() => {
                setIsModalOpen(!isModalOpen)
                setCurrentKeys(item.rights)
                setCurrentId(item.id)
              }}
            />
            <Modal
              title="权限分配"
              open={isModalOpen}
              onCancel={() => setIsModalOpen(!isModalOpen)}
              onOk={handleOk}
            >
              <Tree
                checkable
                checkStrictly
                checkedKeys={currentKeys}
                treeData={rightslist}
                onCheck={onCheck}
              />
            </Modal>
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
        rowKey={(item) => {
          return item.id
        }}
        pagination={{
          pageSize: 5
        }}
      />
    </div>
  )
}
