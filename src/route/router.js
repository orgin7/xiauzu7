import React,{Component} from 'react'
import {HashRouter,NavLink,Switch,Route} from 'react-router-dom'
import Admin from '../pages/Admin/Admin'
import Login from '../pages/Login/Login'
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