import React,{Fragment,Component} from 'react'
import styles from './admin.module.less'
import { Layout, Menu, Breadcrumb} from 'antd';
import SliderNav from '../../components/SliderNav/SliderNav'
const { Header, Content, Sider ,Footer} = Layout;

class Route extends Component{
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
                     <Breadcrumb.Item>Home</Breadcrumb.Item>
                     <Breadcrumb.Item>List</Breadcrumb.Item>
                     <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
                  <Content
                     style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                     }}
                  >
                     Content
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