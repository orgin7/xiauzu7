import React,{Fragment,Component} from 'react'
import {Dropdown,Menu,Icon, message,notification} from 'antd'
import {clear} from '../../utils/webStorage'
import {UserLogout} from '../../api/user'


const menuData =  [
    {path:'',name:'个人信息',icon:'user'},
    {path:'',name:'个人设置',icon:'user'},
    {path:'',name:'退出登录',icon:'user'},

]
const openNotificationWithIcon = (type,msg) =>{
    notification[type]({
        message:'推出结果',
        description:msg,
        duration:1
    });
};

class HeaderNav extends Component{
    clickMenu=(e)=>{
        let {key} = e
        console.log(e)
        switch (Number(key)) {
            case 2:
                UserLogout()
                .then((res)=>{
                    // console.log(res)
                    clear()
                    openNotificationWithIcon('success','退出成功')
                })
                .catch((err)=>{
                    openNotificationWithIcon('error','退出失败请重试')
                })
                break;
        
            default:
                break;
        }
    }
    renderMenu(menuData){
        return(
            <Menu onClick={this.clickMenu}>
      {menuData.map((item,index)=>{
        return(
            <Menu.Item key={index}>
              <span>
                <Icon type='user'></Icon>  
                <span>{item.name}</span>
              </span>
            </Menu.Item>
        )
      })}
    </Menu>
        )
    }
    render(){
        return(
            <Dropdown overlay={this.renderMenu(menuData)}>
                <a className="ant-dropdown-link" href="#">
                admin用户 <Icon type="down" />
                </a>
            </Dropdown>
        )
    }
}

export default HeaderNav
