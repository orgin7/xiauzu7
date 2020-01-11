import React, { Component } from 'react'
import { HashRouter, NavLink, Switch, Route, Redirect, } from 'react-router-dom'
import Admin from '../pages/Admin/Admin'
import Login from '../pages/Login/Login'
import GoodsList from '../pages/GoodData/List/List'
import GoodsAdd from '../pages/GoodData/Add/Add'
import Role from "../pages/power/role"
import Right from "../pages/power/right"
import Home from '../pages/Home/Home'
import UserList from '../pages/User/UserList'
import Data from '../pages/Data/Data'
import Reg from '../pages/Reg/Reg'
import UserAdd from '../pages/User/UserAdd'
import Document from '../pages/Document/Doc/Document'
// import Home from '../pages/Home/Home'
class RouteApp extends Component {
   render() {
      return (
         <HashRouter>
            {/* 导航 */}
            <NavLink to='/login'></NavLink>
            {/* 路由组件 */}
            <Switch>
               <Route path='/login' component={Login}></Route>
               <Route path='/reg' component={Reg}></Route>
               <Route path='/admin' render={() => {
                  return (
                     <Admin>
                       
                        <Switch>
                           <Redirect exact from='/admin' to='/admin/home'></Redirect>
                           <Route exact path="/admin/power/role" component={Role}></Route>
                           <Route path='/admin/goods/list' component={GoodsList}></Route>
                           <Route path='/admin/goods/add' component={GoodsAdd}></Route>
                           <Route exact path="/admin/power/right" component={Right}></Route>
                           <Route exact path='/admin/home' component={Home}></Route>
                           <Route exact path='/admin/data/dataing' component={Data}></Route>
                           <Route exact path='/admin/user' component={UserList}></Route>
                           <Route exact path='/admin/user/add' component={UserAdd}></Route>
                           {/* <Route path='/admin/user/del' component={UserDel}></Route> */}
                           {/* <Route exact path='/admin/user' component={UserList}></Route> */}
                           <Switch>
                              <Route path='/admin/document/list' component={Document}></Route>
                              {/* <Route path='/admin/data/dataing' component={Data}></Route> */}
                           </Switch>

                        </Switch>
                     </Admin>
                  )
               }}></Route>
            </Switch>
         </HashRouter>
      )
   }
}
export default RouteApp