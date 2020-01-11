import React,{Fragment,Component} from 'react'
import styles from './login.module.less'
import  {UserLogin} from  '../../api/user'
import {setItem} from '../../utils/webStorage'
import {Card,Form,Input,Icon,Checkbox,Button,message} from 'antd'


class Login extends Component{
   login=()=>{
      let {getFieldsValue,validateFields}=this.props.form
      validateFields((err,data)=>{
         console.log(err,data)
         if(err) return message.error('输入有误，请重新输入')
         let {userName,passWord} = data
         UserLogin(userName,passWord)
         .then((res)=>{
            console.log(res)
            setItem('userName',res.userName)
            setItem('token',res.token)
            setItem('uid',res.uid)
            // setItem('rootIds',res.rootList)
            message.success('登录成功，1s后跳转首页',1,()=>{
               this.props.history.replace('/admin/home')
            })
         })
         .catch((err)=>{
            console.log(err)
            message.error('密码或账号错误!登录失败',1)
         })
      })
   }
   render(){
      let {getFieldDecorator} = this.props.form
      return(
         <div className={styles.login}>
         <Card  title='用户登录' className={styles['login-card']}>
           <Form.Item>   
             {getFieldDecorator('userName',{
               rules: [{ required: true, message: '用户名不能为空!' },
                       { min:3, message: '用户名不能小于3位字符!' },
                       { max:9, message: '用户名不能大于9位字符!' }]
             })(
               <Input
                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 type="text"
                 placeholder="用户名"
               />
             )}  
           </Form.Item>
           <Form.Item>   
             {getFieldDecorator('passWord',{
               rules:[{required:true,message:'用户密码不能为空'}]
             })(
               <Input
                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 type="password"
                 placeholder="密码"
               />
             )}  
           </Form.Item>
           <Form.Item>
                  {getFieldDecorator('remember', {
                     valuePropName: 'checked',
                     initialValue: true,
                  })(<Checkbox>Remember me</Checkbox>)}
                  <a style={{float:'right'}} className="login-form-forgot" href="">
                     Forgot password
                  </a>
                  <br/>
                  <Button style={{width:'310px'}} type="primary" onClick={()=>{
                     this.login()
                  }}>
                     Login
                  </Button><br/>
                  Or <a href="http://localhost:3000/#/reg">register now!</a>
               </Form.Item>
           </Card> 
       </div>
      )
   }
}
export default Form.create()(Login)
