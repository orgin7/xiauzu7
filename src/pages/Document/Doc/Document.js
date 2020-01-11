import React, { Component, Fragment } from 'react';
import { Input, Table, Pagination, Spin, Button, Drawer, Modal } from 'antd';
import { GetGoods, SearchGood } from '../../Goods/List/List'
import GoodsUpdate from '../../Goods/Update/Update'
import DataMenu from '../../Goods/DataMenu/data'

const { Search } = Input;
const pageSize = 5;
// const RadioGroup = Radio.Group
class GoodsList extends Component {
    constructor() {
        super()
        this.columns = [
            {
                title: '订单号',
                dataIndex: 'num'
            },
            {
                title: 'id',
                dataIndex: '_id'
            },
            {
                title: '订单编号',
                dataIndex: 'number'
            },
            {
                title: '价格',
                dataIndex: 'price'
            },
            {
                title: '是否支付',
                dataIndex: 'pay'
            },
            {
                title: '是否发货',
                dataIndex: 'trans'
            },
            {
                title: '操作',
                dataIndex: '',
                render: (data) => {
                    return (
                        <Fragment>
                            <Button type='primary' size='small' onClick={() => {
                                this.setState({ drawerShow: true, updataInfo: data })
                            }}>
                                编辑</Button>
                            <Button size='small' onClick={() => {
                                this.setState({ modalShow: true, updataInfo: data })
                            }}>查看</Button>
                        </Fragment>
                    )
                }
            },
        ]
        this.state = {
            drawerShow: false,
            modalShow: false,
            nowPage: 1,
            allCount: 0,
            dataSource: [],
            spinning: false,
            updataInfo: [],
            sign:true
        }
    }
    componentDidMount() {
        this.getTableData(1)

    }
    // componentWillUnmount(){
    //     this.setState=(state,callback)=>{
    //        return
    //     }
    //  }
    getTableData(nowPage = 1) {
        this.setState({ spinning: true })
        GetGoods(nowPage, pageSize)
            .then((res) => {
                console.log(res)
                this.setState({ dataSource: res.list.foods, allCount: res.list.allCount, spinning: false ,sign:true})
            })
    }
    // DataClose(sta){
    //     console.log(sta)
    //     this.setState(
    //         {modalShow:sta}
    //         )
    // }
    DataClose = () => {
        this.setState({ modalShow: false })
    }
    KwFind = () => {
      
        console.log('关键字查询')
    }

    render() {
        let { dataSource, allCount, spinning, drawerShow, updataInfo, modalShow ,sign} = this.state
        console.log(allCount)
        console.log(this)
        return (
            <Fragment>
                <Search placeholder="input search text"
                    style={{ width: 300, height: 100 }}
                    onSearch={ value=> 
                    SearchGood(value, 1, pageSize)
                    .then((res) => {
                        console.log(res)
                        this.setState({dataSource: res.list.foods,sign:false,allCount:res.list.allCount})
                    })
                   } enterButton
                />
                <Spin spinning={spinning}>
                    <Table columns={this.columns}
                        dataSource={dataSource}
                        rowKey='_id'
                        pagination={false}></Table>
                </Spin>
                <Pagination simple
                    total={allCount}
                    pageSize={pageSize}
         
                    onChange={(page) => {
                        if(sign){
                             this.getTableData(page)
                        }
                       

                    }} />
                {/* <RadioGroup>
                    <Radio value="center">top</Radio>
                    </RadioGroup> */}
                <Drawer
                    onClose={() => { this.setState({ drawerShow: false }) }}
                    visible={drawerShow}
                >
                    <GoodsUpdate
                        updataInfo={updataInfo}
                        refreshList={() => {
                            this.setState({ drawerShow: false })
                            this.getTableData()
                        }}
                        closeList={() => {
                            this.setState({ drawerShow: false })
                        }}
                    >

                    </GoodsUpdate>
                </Drawer>
                <Modal
                    // onOk={()=>{
                    //     this.DataClose(false)
                    //  }}
                    // onCancel={()=>{
                    //    this.DataClose(false)
                    // }}
                    onOk={this.DataClose}
                    onCancel={this.DataClose}

                    visible={modalShow}>
                    <DataMenu

                        updataInfo={updataInfo}
                        // refreshList={() => {
                        //     this.setState({ modalShow: false })
                        //     this.getTableData()
                        // }}
                    >
                      
                    </DataMenu>
                </Modal>
            </Fragment>
        )
    }
}
export default GoodsList;
