import React,{Component} from 'react'
import {Menu,Icon, Layout, Breadcrumb} from 'antd'
import {Link} from 'react-router-dom'
import MenuData from './AllList'
const {SubMenu} =Menu
const {Sider } = Layout

class SliderNav extends Component{
   renderItem(data){
      if(!data.length){return '暂无数据'}
      let result=data.map((item)=>{
         if(item.children){
            return (
               <SubMenu
               key="sub2"
               title={
                 <span>
                   <Icon type="laptop" />
                   {item.name}
                 </span>
               }
             >
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
         <Sider width={200} style={{ background: '#fff' }}>
         <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
         >
            {this.renderItem(MenuData)}
         </Menu>
      </Sider>
      )
   }
}
export default SliderNav