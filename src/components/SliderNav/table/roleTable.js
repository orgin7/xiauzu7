import React,{Component} from "react";
import { Table, Button,Modal ,Input,message,TreeSelect ,Popconfirm } from 'antd'
import {getPower,delPower,updataPower,ByKwPower} from "../../../api/power"
const { SHOW_PARENT } = TreeSelect;
class Rtable extends Component {
    constructor(){
        super()
        this.state={
            data:[],
            visible: false,
            text:{},
            visible1: false,
            user:{},
            dev:{},
            _id:"",
            value: [],
            msg:[]
        }
        var treeData=[
          {
            title: '商品管理',
            value: '0-0',
            key: '0-0',
            children:[
                        {
                            title: '添加商品',
                            value: '0-1',
                            key: '0-1',
                        },
                        {
                            title: '修改商品',
                            value: '0-2',
                            key: '0-2',
                        },
                        {
                            title: '删除商品',
                            value: '0-3',
                            key: '0-3',
                        }
            ]},
          {
            title:"用户管理",
            value:"1-0",
            key:"1-0",
            children:[
              {
                title:"添加用户",
                value:"1-1",
                key:"1-1"
              },
              {
                title:"删除用户",
                value:"1-2",
                key:"1-2"
              },
              {
                title:"修改用户",
                value:"1-3",
                key:"1-3"
              }
            ]
          },
          {
            title:"订单管理",
            value:"2-0",
            key:"2-0",
            children:[
              {
                title:"添加订单",
                value:"2-1",
                key:"2-1"
              },
              {
                title:"删除",
                value:"2-2",
                key:"2-2"
              },
              {
                title:"修改",
                value:"2-3",
                key:"2-3"
              }
            ]
          }
          ]
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
              width: '100%',
            },
          };
        this.columns=[
            {
                title: '名字',
                dataIndex: 'userName',
                key: 'userName',
                width:150,
            },
            {
                title: '描述',
                dataIndex: 'dev',
                key: 'dev',
                 ellipsis: true,
                 width:150,
            },
            {
                title: '操作',
                
                // dataIndex: '_id', 
                key: 'r',
                width:150,
                render:(data)=>{
                    let {useName,dev,_id,user}=this.state
                    return(
                        <div>
                            <Button type="primary" onClick={()=>{
                              console.log(data)
                              this.showModal()
                              this.state._id=data._id
                              this.state.user=data.useName
                              this.state.dev=data.dev
                            }}>编辑</Button>
                            <Modal 
                                title="修改"
                                visible={this.state.visible}
                                onOk={()=>{
                                  this.handleOk()
                                  this.submit(_id)
                                  this.reload()
                                }}
                                onCancel={this.handleCancel}
                                >
                                 名字：<Input value={user} onChange={(e)=>{
                                   this.setState({      
                                      user:e.target.value    
                                   })
                                 }} ></Input>
                                 描述：<Input value={dev} onChange={(e)=>{
                                   this.setState({
                                       dev:e.target.value                                    
                                   })
                                 }}></Input>
                                 <Button onClick={this.submit}>add</Button>
                                </Modal>
                            <Popconfirm
                              title="确定删除吗"
                              onConfirm={()=>{
                                this.confirm()
                                delPower(data._id)
                                .then(()=>{
                                     this.reload()
                                })
                              }}
                              onCancel={this.cancel}
                              okText="确认删除"
                              cancelText="取消"
                            >
                            <Button type="danger" >删除</Button>
                            </Popconfirm>
                            <Button type="primary" onClick={()=>{
                              this.showModal1()    
                            }}>分配权限</Button>
                            <Modal
                                title="权限分配"
                                visible={this.state.visible1}
                                onOk={this.handleOk1}
                                onCancel={this.handleCancel1}
                                >
                                <TreeSelect {...tProps} />
                            </Modal>
                        </div>  
                    )
                }
            },
        ]
    }
    shuangxin(fvalue){
      ByKwPower(fvalue)
      .then((data)=>{
        if(!data.list.length){
          this.setState({data:[]})
        }
        this.setState(
          data.list.map((item,index)=>{
            let obj = {key:index,userName:item.userName,_id:item._id,dev:item.dev}
            this.state.data=[]
            this.state.data.push(obj)
            
          })
        )
        console.log(this.state.data)
      })
    }
    onChange = value => {
        this.setState({ value:value },()=>{
          this.state.msg.push(this.state.value)
          // console.log(this.state.msg)
        });
      };
    reload(){
        getPower()
        .then((data)=>{
          this.state.data=[]
          this.setState(
            data.list.map((item,index)=>{
              let obj = {key:index,userName:item.userName,_id:item._id,dev:item.dev}
              
              this.state.data.push(obj)
              console.log(this.state.data)
            })
          )
        })
    }
    handleOk = e => {
        // console.log(e);
        this.setState({
          visible: false,
        });
      };
      handleCancel = e => {
        // console.log(e);
        this.setState({
          visible: false,
        });
      };
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
      submit= (_id)=>{
        updataPower(_id,this.state.user,this.state.dev)
      }
    componentDidMount(){
        getPower()
        .then((data)=>{
          this.setState(
            data.list.map((item,index)=>{
              let obj = {key:index,userName:item.userName,_id:item._id,dev:item.dev}
              this.state.data.push(obj)
              // console.log(this.state.data)
            })
          )
        })
    }
    render(){
        return(
            <Table columns={this.columns} dataSource={this.state.data} />
        )
    }
    confirm=(e)=> {
      console.log(e);
      message.success('删除成功');
    }
    cancel=(e)=> {
      console.log(e);
      message.error('取消');
    }
    showModal1 = () => {
        this.setState({
          visible1: true,
        });
      };
    
      handleOk1= e => {
        this.setState({
          visible1: false,
        });
      };
    
      handleCancel1 = e => {
        this.setState({
          visible1: false,
        });
      };
      

}

export default Rtable
