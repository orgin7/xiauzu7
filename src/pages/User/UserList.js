import React,{Fragment,Component} from 'react'
import {Table, Button,Pagination, message,Popconfirm,Spin, Drawer,Form, Row, Icon,Input} from 'antd'
import {userGet,userDel,userUpdate} from '../../api/user'
import {vagurSearch} from '../../api/user'
import styles from './UserListTop.module.less'
class UserList extends Component{
   constructor(){
      super()
      this.columns=[
         {
            title: '用户名',
            dataIndex: 'userName',
            align:'center',
            width:'10%',
            ellipsis:true,
         },
         {
            title: '年龄',
            dataIndex: 'age',
            align:'center',
            width:'10%',
            ellipsis:true,
         },
         {
            title:'创建时间',
            dataIndex:'ctime',
            align:'center',
            width:'15%',
            ellipsis:true,
         },
         {
            title: '联系方式',
            dataIndex: 'phone',
            align:'center',
            width:'15%',
            ellipsis:true,
         },
         {
            title: '邮箱',
            dataIndex: 'email',
            align:'center',
            width:'15%',
            ellipsis:true,
         },
         {
            title:'住址',
            dataIndex:'address',
            align:'center',
            width:'15%',
            ellipsis:true,
         },
         {
            title:'操作',
            align:'center',
            width:'20%',
            render:(data)=>{
               return(
                  <Fragment>
                     <Popconfirm
                        title='Are you sure delete this task?'
                        onConfirm={()=>{
                           userDel(data._id)
                           .then((res)=>{
                              // console.log(res)
                              message.success('删除成功',1)
                              this.getData()
                           })
                           .catch((err)=>{
                              console.log(err)
                           })
                        }}
                        okText="删除"
                        cancelText="取消"
                     >
                        <Button icon='delete' theme="twoTone" style={{marginRight:'20px'}} type='danger'>删除</Button>
                     </Popconfirm>
                     <Button type='primary' icon="edit" theme="twoTone"
                        onClick={()=>{
                           this.setState({drawerShow:true,userName:data.userName,ctime:data.ctime,
                           age:data.age,phone:data.phone,address:data.address,email:data.email,_id:data._id})
                        }}
                     >编辑</Button>
                  </Fragment>
               )
            }
         }
      ]
      this.state={
         dataSource:[],
         spinning:false,
         drawerShow:false,
         allCount:0,
         nowPage:1,
         pageSize:6,
         _id:'',
         userName:'',
         ctime:'',
         age:'',
         phone:'',
         address:'',
         email:'',
         searchValue:'',
         sign:true,
      }
   }
   repair(s){
      var s=Number(s)
      if(s>24){
         return s-24
      }
      if(s<10){
         return '0'+s
      }
      else{
         return s
      }
   }
   componentDidMount(){
      this.getData()
   }
   componentWillUnmount(){
      this.setState=(state,callback)=>{
         return
      }
   }
   getDataByKw(page=1){
      if(this.state.searchValue==''){
         return message.warn('请输入关键字',1)
      } 
      this.setState({spinning:true})
      vagurSearch(this.state.searchValue,page,this.state.pageSize)
         .then((res)=>{
            console.log(res)
            this.changeData(res)
            this.setState({dataSource:res.list,allCount:res.allCount,spinning:false,sign:false})
            // console.log(this.state.allCount,this.state.list)
         })
         .catch((err)=>{
            console.log(err)
         })
   }
   changeData(res){
      res.list.map((item,index)=>{
         //2020-01-07 T 01:59:12  .087Z
         var str1='',str2=''
         str1= item.ctime.split('T')[0]
         str2=item.ctime.split('T')[1].split('.')[0]
         str2=this.repair(parseInt(str2.split(':')[0])+8)+":"+str2.split(':')[1]+":"+str2.split(':')[2]
         item.ctime=str1+" "+str2
         return item
      })
      return res
   }
   getData(page=1){
      this.setState({spinning:true})
      // console.log('获取')
      userGet(page,this.state.pageSize)
      .then((res)=>{
         // console.log(res)
         this.changeData(res)
         this.setState({dataSource:res.list,spinning:false,allCount:res.allCount,sign:true})
         // console.log(this.state.dataSource)
      })
      .catch((err)=>{
         console.log(err)
      })
   }
   render(){
      var {dataSource,spinning}=this.state
      let {_id,userName,age,phone,address,email,allCount,pageSize}=this.state
      // console.log(this.state.userName)
      return(
         <Fragment>
            <div className={styles.top}>
               <div className={styles.input_box}>
                  <span className={styles.kw}>关键字查询</span>
                  <div className={styles.input}>
                     <Icon style={{fontSize:'20px',position:'absolute',right:'20px',zIndex:10}} type='search'></Icon>
                     <input style={{height:'40px',width:'230px',
                     borderRadius:'20px',border:'none',outline:'none',paddingLeft:'20px'
                  }} value={this.state.searchValue} placeholder='请输入查询内容' onChange={(e)=>{
                     this.setState({searchValue:e.target.value})
                  }}/>
                  </div>
                  <Button type='primary' onClick={()=>{
                     this.getDataByKw()
                  }}>搜索</Button>
                  <Button type='default' style={{marginLeft:'50px'}} onClick={()=>{
                     this.getData()
                  }}>全部列表</Button>
                  <Button type='danger' style={{marginLeft:'50px'}} onClick={()=>{
                     this.props.history.replace('/admin/user/add')
                  }}>添加用户</Button>
               </div>
            </div>
            <Spin size='default' 
               spinning={spinning}
            >
               <Table columns={this.columns}
                  dataSource={dataSource}
                  bordered
                  pagination={false}
                  rowKey='_id'
               >
               </Table>
            </Spin>
            <br/>
            <br/>
            <Pagination style={{position:'absolute',bottom:'180px',left:'50px'}}
               simple
               total={allCount}
               pageSize={pageSize}
               onChange={(page)=>{
                  if(this.state.sign){
                     this.getData(page)
                  }else{
                     this.getDataByKw(page)
                  }
               }}
            >
            </Pagination>
            <Drawer
               title="编辑用户信息"
               width={700}
               onClose={()=>{
                  this.setState({drawerShow:false})
               }}
               visible={this.state.drawerShow}
               closable={true}
            >
               <Form layout="vertical" hideRequiredMark>
                  <Row style={{margin:'20px 0'}}>
                     <Form.Item label='用户名' >
                        <Input value={userName} style={{width:'300px'}} onChange={(e)=>{
                           this.setState({userName:e.target.value})
                        }}/>
                        <br/>
                     </Form.Item>
                  </Row>
                  <Row style={{margin:'20px 0'}}>
                     <Form.Item label='年龄' >
                        <Input value={age} style={{width:'300px'}} onChange={(e)=>{
                           this.setState({age:e.target.value})
                        }}/>
                        <br/>
                     </Form.Item>
                  </Row>
                  <Row style={{margin:'20px 0'}}>
                     <Form.Item label='联系方式' >
                        <Input value={phone} style={{width:'300px'}} onChange={(e)=>{
                           this.setState({phone:e.target.value})
                        }}/>
                        <br/>
                     </Form.Item>
                  </Row>
                  <Row style={{margin:'20px 0'}}>
                     <Form.Item label='住址' >
                        <Input value={address} style={{width:'300px'}} onChange={(e)=>{
                           this.setState({address:e.target.value})
                        }}/>
                        <br/>
                     </Form.Item>
                  </Row>
                  <Row style={{margin:'20px 0'}}>
                     <Form.Item label='邮箱' >
                        <Input value={email} style={{width:'300px'}} onChange={(e)=>{
                           this.setState({email:e.target.value})
                        }}/>
                        <br/>
                     </Form.Item>
                  </Row>
               </Form>
               <div
                  style={{
                     position: 'absolute',
                     right: 0,
                     bottom: '100px',
                     width: '100%',
                     borderTop: '2px solid #e9e9e9',
                     borderBottom: '2px solid #e9e9e9',
                     padding: '10px 16px',
                     background: '#fff',
                     display:'flex',
                     justifyContent:'center'
                  }}
               >
                  <Button onClick={this.onClose} style={{width:'300px'}} type="primary"
                     onClick={()=>{
                        userUpdate({_id,userName,age,phone,address,email})
                        .then((res)=>{
                           console.log(res)
                           message.success('修改成功',1)
                           this.getData()
                           this.setState({drawerShow:false})
                        })
                        .catch((err)=>{
                           console.log(err)
                        })
                     }}
                  >
                     修改
                  </Button>
            </div>
            </Drawer>
         </Fragment>
      )
   }
}
export default UserList
