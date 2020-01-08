import React,{Fragment,Component} from 'react'
import styles from './admin.module.less'
import {Link} from 'react-router-dom'
import { Layout, Menu, Breadcrumb} from 'antd';
import SliderNav from '../../components/SliderNav/SliderNav'
const { Header, Content, Sider ,Footer} = Layout;

class Route extends Component{
   bread=()=>{
      var hash =window.location.hash.split('#/admin')[1]
      // console.log(hash)  http://localhost:3000/#/admin/home
      var arr=hash.split('/')
      arr.splice(0,1)
      let arr2=arr.map((item,index)=>{
         item='/'+item
         return item
      })
      // console.log(arr)
      // console.log(arr2)
      return(
        <Fragment>
           {arr2.map((item,index)=>{
               return(
                  <Breadcrumb.Item key={index}>
                     <Link to={'/admin'+this.bindStr(arr2,index)} >{item.split('/')[1].replace(item.split('/')[1][0],item.split('/')[1][0].toLocaleUpperCase())}</Link> 
                  </Breadcrumb.Item>
               )
           })}
        </Fragment>
      )
   }
   bindStr=(arr,index)=>{
      // console.log(arr,index)  //["/user", "/add"] 0
      let newArr=arr.filter((sItem,sIndex)=>{
         if(sIndex<=index){
            return sItem
         }
      })
      // console.log(newArr)
      return newArr.join('')
   }
   render(){
      return(
         <Fragment>
            <Layout className={styles.admin}>
               <Header className="header">
                  <div className="logo" />
                  <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }}
                  >
                  <Menu.Item key="1">nav 1</Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
                  </Menu>
               </Header>
               <Layout>
                  <Sider width={200} style={{ background: '#fff' }}>
                  <Menu
                     mode="inline"
                     defaultSelectedKeys={['1']}
                     defaultOpenKeys={['sub1']}
                     style={{ height: '100%', borderRight: 0 }}
                  >
                  <SliderNav></SliderNav>
                  </Menu>
                  </Sider>
                  <Layout style={{ padding: '0 24px 24px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                      {this.bread()}
                  </Breadcrumb>
                  <Content
                     style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                     }}
                  >
                     {this.props.children}
                  </Content>
                  <Footer>这里是底部</Footer>
                  </Layout>
               </Layout>
            </Layout>
         </Fragment>
      )
   }
}
export default Route