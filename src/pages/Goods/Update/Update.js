import React,{Component,Fragment} from 'react';
import { Button, message,Drawer } from 'antd';
import {UpdateGood} from '../List/List'
class GoodList extends Component{
    constructor(props){
        super()
        console.log(props)
        this.state={...props.updataInfo}
        console.log(this)
    }
    componentWillReceiveProps(props){
        console.log(props)
        this.setState({...props.updataInfo})
        console.log(this)
    }
    submit=()=>{
        UpdateGood(this.state).then((data)=>{
            message.success('修改成功')
            this.props.refreshList()
        })
        console.log(this.state)
    }
    close=()=>{
        this.props.closeList()
    }
    render(){
        let {num,pay,trans,number}=this.state
        return(
            <Fragment>
                订单号:<div>{num}</div><br></br>
                是否支付:<input type='text' value={pay} onChange={(e)=>{this.setState({pay:e.target.value})}}></input><br></br>
                是否发货:<input type='text' value={trans} onChange={(e)=>{this.setState({trans:e.target.value})}}></input><br></br>
                订单编号:<div>{number}</div><br></br>
                <Button onClick={this.close}>取消</Button>
                <Button type='primary' onClick={this.submit}>确定</Button>
            </Fragment>
        )
    }
}
export default GoodList