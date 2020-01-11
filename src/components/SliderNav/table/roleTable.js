import React,{Component} from "react";
import { Table, Button,Modal ,Input,message,TreeSelect ,Popconfirm} from 'antd'
import {getPower,delPower,updataPower} from "../../../api/power"
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
            _id:""
        }
        var treeData={
            title: '商品管理',
            value: '0-0',
            key: '0-0',
            children:[
                {
                    title: '商品列表',
                    value: '0-1',
                    key: '0-1',
                    children:[
                        {
                            title: '添加商品',
                            value: '0-1-0',
                            key: '0-1-0',
                        },
                        {
                            title: '修改商品',
                            value: '0-1-1',
                            key: '0-1-1',
                        },
                        {
                            title: '删除商品',
                            value: '0-1-2',
                            key: '0-1-2',
                        }
                    ]
                }
            ]
        }
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            multiple:true,
            checkable:true,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            // onChange:{},
            style: {
              width: '100%',
            },
          };
        this.columns=[
            {
                title: '名字',
                dataIndex: 'user',
                key: 'user',
                
            },
            {
                title: '描述',
                dataIndex: 'dev',
                key: 'dev',
                
            },
            {
                title: '操作',
                // dataIndex: '_id',
                key: 'r',
                render:(data)=>{
                    let {user,dev,_id}=this.state
                    return(
                        <div>
                            <Button type="primary" onClick={()=>{
                              console.log(data)
                              this.showModal()
                              this.state._id=data._id
                              this.state.user=data.user
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
    onChange = value => {
        this.setState({ value });
      };
    reload(){
        getPower()
        .then((data)=>{
            this.setState({data:data.data.db})
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
            console.log(data.data.db)
            this.setState({data:data.data.db})
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
