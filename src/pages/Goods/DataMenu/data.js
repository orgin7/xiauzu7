import React,{Component,Fragment} from 'react';
import { Button, message } from 'antd';
class GoodData extends Component{
    constructor(props){
        super()
        console.log(props)
        this.state={...props.updataInfo}
        console.log(this)
    }
    componentWillReceiveProps(props){
        console.log(props)
        this.setState={...props.updataInfo}
    }
  
   
    render(){
        let {num,pay,number,trans,price}=this.state
        return(
            <Fragment>
                订单号:<div>{num}</div><br></br>
                是否支付:<div>{pay}</div><br></br>
                订单价格：<div>{price}</div>
                订单编号:<div>{number}</div><br></br>
                是否发货:<div>{trans}</div><br></br>
               
           
            
            </Fragment>
        )
    }
}
export default GoodData