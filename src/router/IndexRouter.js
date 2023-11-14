import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'
import Login from '../views/login/Login'
import Detail from '../views/sandbox/news/Detail'
import News from '../views/sandbox/news/News'
import NewsSandBox from '../views/sandbox/NewsSandBox'

export default function IndexRouter() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route
            path="/login"
            component={Login}
          ></Route>

          <Route
            path="/news"
            component={News}
          ></Route>
          <Route
            path="/detail/:id"
            component={Detail}
          ></Route>
          <Route
            path="/"
            render={() => (localStorage.getItem('token') ? <NewsSandBox /> : <Redirect to="/login" />)}
          ></Route>
        </Switch>
      </HashRouter>
    </div>
  )
}
