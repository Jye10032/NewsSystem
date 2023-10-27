import React from 'react'
import { BrowserRouter, Route, Routes, redirect, Navigate } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import Nopermission from '../views/sandbox/nopermission/Nopermission'

export default function indexRouter() {
    return (

        <Routes>
            <Route path="/login" element={<Login />} ></Route>
            {/* <Route path="/  " element={<NewsSandBox />} ></Route> */}
            <Route path="/*" element={localStorage.getItem("token") ? <NewsSandBox /> : <Login />} />
        </Routes>

    )
}
