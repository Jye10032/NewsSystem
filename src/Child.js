import React from 'react'
import style from './Child.module.scss'

export default function Child() {
    return (
        <div>
            <ul>
                <li className={style.item}>4</li>
                <li>5</li>
                <li>6</li>
            </ul>
        </div>
    )
}