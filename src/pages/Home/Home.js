import React,{Fragment,Component} from 'react'
import Pie from '../../components/echarts/Pie/Pie'
import Line from '../../components/echarts/Line/Line'
import {getItem} from '../../utils/webStorage'
import styles from './Home.module.less'
import { Icon } from 'antd'
import ReactEcharts from 'echarts-for-react';
class Home extends Component{
   constructor(){
      super()
      this.state={
         shop:[
            {name:'工专路 1 号店',num:323.324},
            {name:'工专路 2 号店',num:323.324},
            {name:'工专路 3 号店',num:323.324},
            {name:'工专路 4 号店',num:323.324},
            {name:'工专路 5 号店',num:323.324},
            {name:'工专路 6 号店',num:323.324},
            {name:'工专路 7 号店',num:323.324},
            {name:'工专路 8 号店',num:323.324},
         ],
        option1: {
            xAxis: {
               type: 'category',
               boundaryGap: false,
               data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
               type: 'value',
               axisLine: {show: false},
                  axisLabel: {show: false},
                  axisTick: {show: false},
                  splitLine: {show: false}
            },
            series: [{
               data: [300, 410, 300, 334, 230, 300, 350],
               type: 'line',
               areaStyle: {color:'rgb(194,53,49)'},
               symbol:'none',
               smooth: true,
            }]
         },
         option2: {
            xAxis: {
               type: 'category',
               boundaryGap: false,
               data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','d','s','sf']
            },
            yAxis: {
               type: 'value',
               axisLine: {show: false},
                  axisLabel: {show: false},
                  axisTick: {show: false},
                  splitLine: {show: false}
            },
            series: [{
               data: [100, 150, 200, 134, 320, 190, 350,200,172,245],
               type: 'bar',
               areaStyle: {color:'skyblue'},
               symbol:'none',
               barWidth : 20,
               itemStyle:{
                  color:'skyblue',
                  
               },
               smooth: true,
            }]
         },
         option3 : {
            title:{
               text:'销售趋势'
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    splitLine: {show: false},
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '50%',
                    data: [100, 52, 200, 334, 390, 330, 220,47,67,100,200,175],
                }
            ]
        }
      }
   }
   componentDidMount(){
      if(!getItem('token')){
         this.props.history.replace('/login')
      }
   }
   render(){
      return(
         <Fragment>
            <div className={styles.top}>
               <div className={styles.item}>
                  <div className={styles.item_top}>
                     <p className={styles.all}>
                        <span>总销售额</span>
                        <Icon type="info-circle"></Icon>
                     </p>
                     <p className={styles.num}>
                        ￥ 215,724
                     </p>
                  </div>
                  <div className={styles.item_middle}>
                     <p className={styles.week}>
                        <span>周同比</span>
                        <span>12%</span>
                        <Icon style={{color:'green',fontSize:'10px',alignSelf:'center'}} type='caret-up'></Icon>
                     </p>
                     <p className={styles.day}>
                        <span>日同比</span>
                        <span>12%</span>
                        <Icon style={{color:'red',fontSize:'10px',alignSelf:'center'}} type='caret-down'></Icon>
                     </p>
                  </div>
                  <div className={styles.item_footer}>
                     <span>日销售额 ￥ 12,155</span>
                  </div>
               </div>
               <div className={styles.item}>
                  <div className={styles.item_top}>
                     <p className={styles.all}>
                        <span>访问量</span>
                        <Icon type="info-circle"></Icon>
                     </p>
                     <p className={styles.num}>
                        8,888
                     </p>
                  </div>
                  <div className={styles.item_middle}>
                     <ReactEcharts style={{height:'100%',width:'100%'}} option={this.state.option1}></ReactEcharts>
                  </div>
                  <div className={styles.item_footer}>
                     <span>日销售额 1234</span>
                  </div>
               </div>
               <div className={styles.item}>
                  <div className={styles.item_top}>
                     <p className={styles.all}>
                        <span>支付笔数</span>
                        <Icon type="info-circle"></Icon>
                     </p>
                     <p className={styles.num}>
                        6,666
                     </p>
                  </div>
                  <div className={styles.item_middle}>
                     <ReactEcharts style={{height:'100%',width:'100%'}} option={this.state.option2}></ReactEcharts>
                  </div>
                  <div className={styles.item_footer}>
                     <span>转化率 60%</span>
                  </div>
               </div>
               <div className={styles.item}>
                  <div className={styles.item_top}>
                     <p className={styles.all}>
                        <span>运营活动效果</span>
                        <Icon type="info-circle"></Icon>
                     </p>
                     <p className={styles.num}>
                        88%
                     </p>
                  </div>
                  <div className={styles.item_middle}>
                     <div className={styles.progress_box}>
                        <div className={styles.progress}>
                        </div>
                     </div>
                  </div>
                  <div className={styles.item_footer}>
                        <span>周同比 12%</span>
                        <span style={{paddingLeft:'6px'}}></span>
                        <Icon style={{color:'green',fontSize:'10px',alignSelf:'center'}} type='caret-up'></Icon>
                        <span style={{paddingLeft:'6px'}}></span>
                        <span>日同比 12%</span>
                        <span style={{paddingLeft:'6px'}}></span>
                        <Icon style={{color:'red',fontSize:'10px',alignSelf:'center'}} type='caret-down'></Icon>
                  </div>
               </div>
            </div>
            <div style={{display:'flex',padding:'10px',justifyContent:'space-around'}}>
               <Pie></Pie>
               <Line></Line>
            </div>
            <div style={{width:'100%',height:'300px',display:'flex'}}> 
               <div style={{width:'70%',height:'300px'}}>
                  <ReactEcharts option={this.state.option3}></ReactEcharts>
               </div>
               
               <div style={{width:'30%',height:'300px'}}>
                  <ul>
                     <p className={styles.bc}>门店销售额排名</p>
                     {this.state.shop.map((item,index)=>{
                        return(
                           <li key={index} className={styles.shop}>
                              <div>
                                 <span style={this.classN(index)}>{index+1}</span>
                                 <span>{item.name}</span>
                              </div>
                              <span>{item.num}</span>
                           </li>                           
                        )
                     })}
                  </ul>
               </div>
            </div>
         </Fragment>
      )
   }
   classN=(index)=>{
      // console.log('sfsf')
      if(index<3){
         // console.log('styles.bc')
         return {width:'20px',
                  display: 'inline-block',
                  height:'20px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  lineHeight: '20px',
                  background:'rgb(49,70,89)',
                  color:'#fff'}
      }else{
         // console.log('空')
         return {fontSize:'14px',height:'16px',width:'20px',  
         textAlign: 'center', display: 'inline-block',
          lineHeight: '20px',}
      }
   }
}
export default Home