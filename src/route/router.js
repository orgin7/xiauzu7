import React,{Component} from 'react'
import {HashRouter,NavLink,Switch,Route,Redirect,} from 'react-router-dom'
import Admin from '../pages/Admin/Admin'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import UserList from '../pages/User/UserList'
import Reg from '../pages/Reg/Reg'
import UserAdd from '../pages/User/UserAdd'
class RouteApp extends Component{
   render(){
      return(
         <HashRouter>
            {/* 导航 */}
            <NavLink to='/login'></NavLink>
            {/* 路由组件 */}
            <Switch>
               <Route path='/login' component={Login}></Route>
               <Route path='/reg' component={Reg}></Route>
               <Route path='/admin' render={()=>{
                  return(
                     <Admin>
                        <Redirect from='/admin' to='/admin/home'></Redirect>
                        <Route path='/admin/home' component={Home}></Route>
                        <Route exact path='/admin/user' component={UserList}></Route>
                        <Route exact path='/admin/user/add' component={UserAdd}></Route>
                     </Admin>
                  )
               }}></Route>
            </Switch>
         </HashRouter>
      )
   }
}
export default RouteApp