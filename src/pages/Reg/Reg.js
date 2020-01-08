import React,{Component} from 'react'
import { Form, Row, Col, Input, Button, Icon ,message} from 'antd';
import {userReg} from '../../api/user'
import styles from './Reg.module.less'
class Login extends Component{
   constructor(){
      super()
      this.state={
         addMsg:[
            {msg:'userName',rex:'^[a-zA-Z0-9_]{4,16}$',errmsg:'只允许4-16位由数字字母下划线组成'},//4-16位数字字母下划线
            {msg:'passWord',rex:'^[a-zA-Z0-9_]{6,16}$',errmsg:'只允许6-16位由数字字母下划线组成'},
            {msg:'age',rex:'^\\d{1,3}$',errmsg:'请输入正整数'},
            {msg:'phone',rex:'^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$',errmsg:'请输入正确的手机号'},
            {msg:'address',rex:'',errmsg:''},
            {msg:'email',rex:'^([A-Za-z0-9_\\-\\.])+\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$',errmsg:'请输入正确邮箱'}
         ],
      }
   }
   submit(){
      // console.log(this.props.form)
      let {validateFields}=this.props.form
      validateFields((err,data)=>{
         // console.log('err',err)
         if(err){
            return message.error('请正确填写信息',1)
         }
         // console.log('data',data)
         userReg(data)
         .then((res)=>{
            console.log(res)
            if(res.err==0){
               message.success('注册成功',1,()=>{
                  // this.props.history.replace('/login')
               })
            }
         })
         .catch((err)=>{
            console.log(err)
            if(err.err==-1){
               message.error('注册失败',1)
            }
            if(err.err==-2){
               message.info('用户名已存在',1)
            }
         })
      })
   }
   render(){
      const { getFieldDecorator } = this.props.form;
      return(
         <div className={styles.reg}>
            <Row style={{background:'#fff',width:'800px',height:'340px',position:"absolute",right:'100px',top:'30%',
               opacity:'0.9',borderRadius:'20px'
            }} gutter={24}>
               <div style={{position:'absolute',width:'500px',height:'50px',
                  left:'134px',top:'15px',textAlign:'center',fontSize:'28px',fontWeight:'bold'
               }}>这里是注册界面哟</div>
               {this.state.addMsg.map((item,index)=>{
                  return(
                     <Col style={{height:'30px',marginTop:'70px'}} span={8}  key={index}>
                        <Form.Item label={item.msg} >
                           {getFieldDecorator(`${item.msg}`, {
                              rules: [
                                 {required: true,message: 'Input something!'},
                                 {pattern:``,message:`${item.errmsg}`},
                              ],
                           })(<Input placeholder={'请输入'+item.msg} />)}
                           <br/>
                        </Form.Item>
                     </Col>
                  )
               })}
               <Button onClick={()=>{
                  this.submit()
               }} style={{borderRadius:'20px',height:'40px',fontSize:'16px',width:'300px',position:'absolute',left:'250px',bottom:'20px'}} type='primary'>reg</Button>
            </Row>
         </div>
      )
   }
}
export default Form.create()(Login)