import React,{Component} from 'react'
import {HashRouter,NavLink,Switch,Route,Redirect,} from 'react-router-dom'
import Admin from '../pages/Admin/Admin'
import Login from '../pages/Login/Login'

import Role from "../pages/power/role"
import Right from "../pages/power/right"


import Home from '../pages/Home/Home'
import UserList from '../pages/User/UserList'
import Data from '../pages/Data/Data'

class RouteApp extends Component{
   render(){
      return(
         <HashRouter>
            {/* 导航 */}
            <NavLink to='/login'></NavLink>
            {/* 路由组件 */}
            <Switch>
               <Route path='/login' component={Login}></Route>
               <Route path='/admin' render={()=>{
                  return(
                     <Admin>
                        <Route path="/admin/power/role" component={Role}></Route>
                        <Route path="/admin/power/right" component={Right}></Route>
                        <Redirect from='/admin' to='/admin/home'></Redirect>
                        <Route path='/admin/home' component={Home}></Route>
                        <Route path='/admin/user/list' component={UserList}></Route>
                        <Switch>
                        <Route path='/admin/data/dataing' component={Data}></Route>
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