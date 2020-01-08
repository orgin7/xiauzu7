import React,{Fragment,Component} from 'react'
import {Table} from 'antd'
class Login extends Component{
   constructor(){
      super()
      this.columns=[
         {
            title: '姓名',
            // dataIndex: 'age',
            key: 'name',
         },
         {
            title: '年龄',
            // dataIndex: 'age',
            key: 'age',
         },
         {
            title: '性别',
            // dataIndex: 'age',
            key: 'sex',
         },
         {
            title: '联系方式',
            // dataIndex: 'age',
            key: 'tell',
         },
         {
            title: '住址',
            // dataIndex: 'age',
            key: 'address',
         },
      ]
   }
   render(){
      return(
        <Table columns={this.columns} >

        </Table>
      )
   }
}
export default Login