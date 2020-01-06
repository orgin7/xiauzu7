import React,{Component} from 'react'
import {Menu,Icon} from 'antd'
import {Link} from 'react-router-dom'
import MenuData from './AllList'
const {SubMenu} =Menu

class SliderNav extends Component{
   renderItem(data){
      if(!data.length){return '暂无数据'}
      let result=data.map((item)=>{
         if(item.children){
            return (
               <SubMenu key={item.id} title={
                  <span>
                     <Icon type={item.icon||'home'}></Icon>
                     <span>{item.name||'哈哈'}</span>
                  </span>
               }>
                  {this.renderItem(item.children)}
               </SubMenu>
            )
         }
         else{
            return (
               <Menu.Item key={item.id}>
                  <Link to={item.path||'/admin'}>
                     <span>
                        <Icon type={item.icon||'smile'}></Icon>
                        <span>{item.name||'哈哈'}</span>
                     </span>
                  </Link>
               </Menu.Item>
            )
         }
      })
      return result
   }
   render(){
      return(
         <Menu mode='vertical' >
            {this.renderItem(MenuData)}
         </Menu>  
      )
   }
}
export default SliderNav