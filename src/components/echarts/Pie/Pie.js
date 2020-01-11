import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class Pie extends Component{
constructor(){
  super()
  this.state={
    option:{
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['商品详情', '首页', '商品列表', '分类']
        },
      series: [
        {
            name: '最受欢迎的早餐',
            type: 'pie',
            radius: '55%',
            center: ['50%', '40%'],
            data:[{value: 20, name: '商品详情'},]
        }
    ]
    }
  }
}
componentDidMount(){
  setTimeout(() => {
    let data =  [
      {value: 20, name: '商品详情'},
      {value: 40, name: '首页'},
      {value: 30, name: '商品列表'},
      {value: 50, name: '分类'}
  ] 
  let option = JSON.parse(JSON.stringify(this.state.option ))
  option.series[0].data=data
  this.setState({option},()=>{
    console.log(this)
  })
  },3000);
}
componentDidUpdate(){
  console.log('图表更新结束')
}
render() {
  console.log('图标render')
  let {option} = this.state
 return(
   <div style={{width:'500px'}}>  
     <ReactEcharts option={option}></ReactEcharts>
   </div>
 )
}
}
export default Pie;
