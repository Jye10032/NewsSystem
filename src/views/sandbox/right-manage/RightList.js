import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios'

const { confirm } = Modal;

export default function RightList() {
    const [dataSource, setdataSoure] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children").then(res => {
            const list = res.data
            list.forEach(item => {
                if (item.children.length === 0) {
                    item.children = ""
                }
            })
            setdataSoure(list)
        })
    }, [])

    const [modal, contextHolder] = Modal.useModal();

    const showConfirm = (item) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
                deleteMethod(item);
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            //key: 'name',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            //key: 'address',
            render: (key) => {
                return <Tag color="orange">{key}</Tag>
            }
        },
        {
            title: '操作',
            //key: 'age',

            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />}
                        onClick={() => showConfirm(item)} />
                    <Button type="primary" shape="circle" icon={<EditOutlined />} />

                </div>
            }
        },
    ];

    //删除
    const deleteMethod = (item) => {//实现当前页面同步状态+后端同步删除
        console.log("delete")

        //遍历data，找到id相同的项，删除
        setdataSoure(dataSource.filter(data => data.id !== item.id))

        axios.delete(`http://localhost:8000/rights/${item.id}`).then(res => {
            console.log(res.data)
        })
    }

    return (
        <div>

            <Table dataSource={dataSource} columns={columns}
                pagination={{ pageSize: 5 }} />
        </div>
    )
}
