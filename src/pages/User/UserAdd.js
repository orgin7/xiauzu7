import React,{Fragment,Component} from 'react'
import { Form, Row, Col, Input, Button, Icon, message } from 'antd';
import {userReg} from '../../api/user'
import './UserAdd.less'
class UserAdd extends Component{
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
      let {validateFields} =this.props.form
      validateFields((err,data)=>{
         // console.log(err,data)
         if(err){
            message.error('请输入有效信息',1)
         }
         else{
            userReg(data)
            .then((res)=>{
               console.log(res)
               message.success('添加成功',1,()=>{
                  this.props.history.replace('/admin/user')
               })
            })
            .catch((err)=>{
               console.log(err)
               if(err.err==-2){
                  message.error('已有该用户',1)
               }else{
                  message.error('添加失败！请重试',)
               }
               
            })
         }
      })
   }
   render(){
      const { getFieldDecorator } = this.props.form;
      return(
         <Fragment>
            <Row gutter={24}>
            {this.state.addMsg.map((item,index)=>{
               if(index==1){
                  return(
                     <div key={index}> 
                        <Col span={8}  key={index}>
                           <Form.Item label={item.msg} >
                              {getFieldDecorator(`${item.msg}`, {
                                 rules: [
                                    {required: true,message: 'Input something!'},
                                    {pattern:``,message:`${item.errmsg}`},
                                 ],
                              })(<Input.Password placeholder={'请输入'+item.msg} />)}
                              <br/>
                           </Form.Item>
                        </Col>
                     </div>
                  )
               }
               return(
                  <div key={index}> 
                     <Col span={8}  key={index}>
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
                  </div>
               )
            })}
            </Row> 
            <div>
               <Button type='dashed' style={{position:'absolute',width:'100px',height:'40px',
                  bottom:'200px' ,left:'300px'
               }} onClick={()=>{
                  this.props.history.replace('/admin/user')
               }}>取消</Button>
               <Button style={{position:'absolute',width:'100px',height:'40px',
                  bottom:'200px',left:'620px'
               }} type='primary' onClick={()=>{
                  this.submit()
               }}>添加</Button>
            </div>
         </Fragment>
      )
   }
}
export default Form.create()(UserAdd) 
