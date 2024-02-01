import Home from '../../views/sandbox/home/Home'
import RightList from '../../views/sandbox/right-manage/RightList'
import RoleList from '../../views/sandbox/right-manage/RoleList'
import UserList from '../../views/sandbox/user-manage/UserList'
import Nopermission from '../../views/sandbox/nopermission/Nopermission'
import Audit from '../../views/sandbox/audit-mange/Audit'
import AuditList from '../../views/sandbox/audit-mange/AuditList'
import NewAdd from '../../views/sandbox//news-mange/NewsAdd'
import NewsCategory from '../../views/sandbox/news-mange/NewsCategory'
import NewsDraft from '../../views/sandbox/news-mange/NewsDraft'
import NewsPreivew from '../../views/sandbox/news-mange/NewsPreivew'
import NewsUpdate from '../../views/sandbox/news-mange/NewsUpdate'
import Published from '../../views/sandbox/publish-mange/Published'
import Unpublished from '../../views/sandbox/publish-mange/Unpublished'
import Sunset from '../../views/sandbox/publish-mange/Sunset'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
/**
 * 对应页面的路由导航
 * 1.判断用户是否具有访问权限
 * 2.判断路由是否存在
 * 3.Spin：进度条加载指示器
 * 4.在backRouteList中,由于LocalRouterMap[item.key] 是一个组件，
 * 应该返回 <LocalRouterMap[item.key] />，而不是 LocalRouterMap[item.key]，
 * 但是因为 item.key 是一个变量，
 * 不能直接在 JSX 中使用它来创建一个组件实例。
 * 需要先获取到组件，然后再使用 React.createElement() 来创建一个组件实例
 */

const LocalRouterMap = {
    '/home': Home,
    '/user-manage/list': UserList,
    '/right-manage/role/list': RoleList,
    '/right-manage/right/list': RightList,
    '/audit-manage/audit': Audit,
    '/audit-manage/list': AuditList,
    '/news-manage/add': NewAdd,
    '/news-manage/category': NewsCategory,
    '/news-manage/draft': NewsDraft,
    '/news-manage/preview/:id': NewsPreivew,
    '/news-manage/update/:id': NewsUpdate,
    '/publish-manage/sunset': Sunset,
    '/publish-manage/published': Published,
    '/publish-manage/unpublished': Unpublished
}

function NewsRouter(props) {
    const {
        role: { rights }
    } = JSON.parse(localStorage.getItem('token'))
    const [backRouteList, setBackRouteList] = useState([])
    useEffect(() => {
        Promise.all([axios.get('/children'), axios.get('/rights')]).then((res) => {
            setBackRouteList([...res[0].data, ...res[1].data])
        })
    }, [])
    // 检车用户的权限
    function checkUserPermission(key) {
        return rights.includes(key)
    }
    // 检测路径是否存在
    function checkRoute(item) {
        return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    }
    return (
        <Spin
            size="large"
            tip="加载中..."
            spinning={props.isLoding}
        >
            <Routes>
                {backRouteList.map((item) => {
                    if (checkUserPermission(item.key) && checkRoute(item)) {
                        //console.log(item.key)
                        return (
                            <Route
                                path={item.key}
                                key={item.key}
                                element={React.createElement(LocalRouterMap[item.key])}
                            ></Route>
                        )
                    } else {
                        return null
                    }
                })}

                {/* <Redirect
                    from="/"
                    to="/home"
                    exact
                ></Redirect>
                <Route
                    path="*"
                    component={NoPermission}
                ></Route> */}
                <Route path="/" element={<Home />}></Route>
                <Route path="*" element={<Nopermission />} />
            </Routes>
        </Spin >
    )
}

export default connect((state) => ({
    isLoding: state.isLoding
}))(NewsRouter)
