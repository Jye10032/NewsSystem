import React from 'react'
import { Button } from 'antd'
import NewsSandBox from '../NewsSandBox'
import axios from 'axios'

export default function Home() {
    const ajax = () => {
        //取数据
        axios.get('http://localhost:8000/posts').then(res => {
            console.log(res.data)
        })
    }
    return (
        <div>
            <Button onClick={ajax}>取数据</Button>
        </div>
    )
}
