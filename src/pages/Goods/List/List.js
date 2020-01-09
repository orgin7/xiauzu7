import React,{Fragment,Component} from 'react'
import styles from './list.module.less'
import {getGoods,delGood,getGoodsByKw,getGoodsByType} from '../../../api/api'
import  GoodsUpdate from  '../Update/Update'
import {Table,Spin,Button,Drawer,Input,message,Popconfirm ,Pagination,Card,Select } from 'antd'
const { Option } = Select;
const { Search } = Input;
const pageSize = 3

class GoodsList extends Component{
    constructor(){
        super()
        this.columns = [
            {
                title:'id',
                dataIndex:'_id',
                
                ellipsis: true,
            },
            {
                title:'名称',
                dataIndex:'name',
               
                ellipsis: true,
            },
            {
                title:'描述',
                dataIndex:'desc',
                
                ellipsis: true,
            },
            {
                title:'类型',
                dataIndex:'foodType',
                
                ellipsis: true,
            },
            {
                title:'价格',
                dataIndex:'price',
                
                ellipsis: true,
            },
            {
                title:'图片',
                dataIndex:'img',
                ellipsis: true,
                render:(data)=>{
                    return(
                        <img src={data} width='147' height='57' alt=""/>
                    )
                }
            },
            {
                title:'操作',
                render:(data)=>{
                    // console.log(data);
                    return (
                        <Fragment>
                            <Popconfirm
                                title='确定要删除本条数据吗？'
                                onConfirm={()=>{
                                // console.log(this,data._id)
                                this.delData(data._id)
                                }}
                                okText='删除'
                                cancelText='取消'
                            >
                                <Button type='danger' size='small'>删除</Button>
                            </Popconfirm>
                            <Button type='primary' size='small' onClick={()=>{
                                // console.log(this);   
                                this.setState({drawerShow:true,updataInfo:data})
                            }}>更新</Button>
                            </Fragment>
                    )
                }
            }
        ]
        this.state = {
            drawerShow:false,
            spinning:true,
            dataSource:[],
            updataInfo:{},
            allCount:0,
            selectMethod:2,
            nowPage:1,
        }
    }
    componentDidMount(){
        this.getTableData()
    }
    getTableData(nowPage = 1){
      // 根据页数获取网络数据
      getGoods(nowPage,pageSize).then((res)=>{
        message.success('查询ok',1)
        this.setState({spinning:false,dataSource:res.list.foods,allCount:res.list.allCount})
      })
    }
    delData(_id){
        delGood(_id).then((res)=>{
          message.success('删除ok',1)
          this.getTableData()
        })
    }
    search(kw){
        let {selectMethod,nowPage} = this.state
        let page = nowPage
      switch (Number(selectMethod)) {
        case 2:
            getGoodsByKw({kw,page,pageSize}).then((res)=>{
            message.success('查询ok',1)
            // console.log(res);
            this.setState({spinning:false,dataSource:res.list.foods,allCount:res.list.allCount})
            })
            break;
        case 1:
        let foodType = kw
        getGoodsByType({foodType,page,pageSize}).then((res)=>{
            message.success('查询ok',1)
            // console.log(res)
            this.setState({spinning:false,dataSource:res.list.foods,allCount:res.list.allCount})
        })
            break;
          default:
              break;
      }
    }
    render(){
        let {spinning,dataSource,drawerShow,updataInfo,allCount} = this.state
       return (
              <div className={styles.lists}>
                <div className={styles.header}>
                <Select defaultValue="2" style={{ width: 120 }} onChange={(value)=>{
                    this.setState({selectMethod:value})
                    console.log(this.state.selectMethod)
                }}>
                <Option value="0" disabled>分页查询</Option>
                <Option value="1">分类查询</Option>
                <Option value="2">关键字查询</Option>
                </Select>
                <Search placeholder="请输入查找内容" onSearch={(value)=>{this.search(value)}} enterButton className={styles.ipt}/>
                <Button type="primary" onClick={()=>{
                    this.props.history.push('/admin/goods/add')
                }}>商品添加</Button>
                </div>
                <Spin spinning={spinning}>
                    <Table columns={this.columns} dataSource={dataSource}
                    rowKey='_id'
                    pagination={false}
                    scroll={{y:280,x:500}}>
                    </Table>
                </Spin>
                <Pagination 
                simple  
                total={allCount} 
                pageSize={pageSize} 
                onChange={(page)=>{
                    console.log('目标页数',page)
                    this.getTableData(page)
                }}
                />
                <Drawer
                    closable={true}
                    onClose={()=>{this.setState({drawerShow:false}) }}
                    placement="right"
                    closable={true}
                    width={400}  
                    visible={drawerShow}
                    >
                        <GoodsUpdate 
                        updataInfo={updataInfo} 
                        refreshList={()=>{
                        // 收起抽屉
                        this.setState({drawerShow:false}) 
                        // 更新完毕后刷新界面
                        this.getTableData()
                        }}></GoodsUpdate>
                </Drawer>
            </div> 
       
            
       ) 
    }
}
export default GoodsList