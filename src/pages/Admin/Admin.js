import React,{Fragment,Component} from 'react'
import styles from './admin.module.less'
import { Layout, Menu,Icon,Modal} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ActionCreator from '../../store/actionCreator'
import {bindActionCreators} from 'redux'
import SliderNav from '../../components/SliderNav/SliderNav'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
const { Header, Content, Sider ,Footer} = Layout;

class Route extends Component{
   render(){
      console.log(this)
      let {tokenModal,setTokenModal} = this.props
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
                     <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                        className="trigger"
                        />
                        <HeaderNav></HeaderNav>
                     </Header>
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