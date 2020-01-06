import React,{Component} from 'react'
import {HashRouter,NavLink,Switch,Route,Redirect,} from 'react-router-dom'
import Admin from '../pages/Admin/Admin'
import Login from '../pages/Login/Login'
import UserAdd from '../pages/User/UserAdd'
import UserDel from '../pages/User/UserDel'
import Home from '../pages/Home/Home'
import UserList from '../pages/User/UserList'
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
                        <Redirect from='/admin' to='/admin/home'></Redirect>
                        <Route path='/admin/home' component={Home}></Route>
                        <Route path='/admin/user/add' component={UserAdd}></Route>
                        <Route path='/admin/user/del' component={UserDel}></Route>
                        <Route path='/admin/user/list' component={UserList}></Route>
                     </Admin>
                  )
               }}></Route>
            </Switch>
         </HashRouter>
      )
   }
}
export default RouteApp