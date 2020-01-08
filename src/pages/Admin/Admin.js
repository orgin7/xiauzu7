import React,{Fragment,Component} from 'react'
import styles from './admin.module.less'
import {Link} from 'react-router-dom'
import { Layout, Menu, Breadcrumb,Icon,Modal} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ActionCreator from '../../store/actionCreator'
import {bindActionCreators} from 'redux'
import SliderNav from '../../components/SliderNav/SliderNav'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import './admin.less'
const { Header, Content, Sider ,Footer} = Layout;

class Route extends Component{
   // componentDidMount(){
   //    window.addEventListener('load',()=>{
   //       this.props.history.push('/admin/home')
   //    })
   // }
   // remove(){
   // }
   // componentWillUnmount(){
   //    window.removeEventListener('load',this.remove)
   // }
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
                     <span style={{fontWeight:'bold',}}>
                        {item.split('/')[1].replace(item.split('/')[1][0],item.split('/')[1][0].toLocaleUpperCase())}
                     </span> 
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
      // console.log(this)
      let {tokenModal,setTokenModal} = this.props
      return(
         <Fragment>
            <Layout className={styles.admin}>
               <Header className="header">
                  <div className="logo" />
                  <Menu
                  theme="dark"
                  mode="horizontal"
                  
                  style={{ lineHeight: '64px' }}
                  >
                  </Menu>
               </Header>
               <Layout>
                  <Sider width={200} style={{ background: '#fff' }}>
                     <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        // defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                     >
                     <SliderNav></SliderNav>
                     </Menu>
                  </Sider>
                  <Layout style={{ padding: '0 24px 24px' ,position:'relative'}}>
                     {/* <Header style={{background:'rgb(240,242,245)'}}> */}
                        <Breadcrumb style={{ margin: '16px 0' }}>
                           {this.bread()}
                        </Breadcrumb>
                        <HeaderNav className={styles.head}></HeaderNav>
                     {/* </Header> */}
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
            {/* 模态框 */}
            <Modal
            title='提示'
            visible={tokenModal}
            onCancel={()=>{
               setTokenModal(false)
             }}
             onOk={()=>{
               this.props.history.replace('/login')
               setTokenModal(false)
             }}
            >
               token失效！请重新登录
            </Modal>
         </Fragment>
      )
   }
}
export default connect(state=>state,(dispatch)=>{
   return bindActionCreators(ActionCreator,dispatch)
})(withRouter(Route))