import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class Line extends Component{
  constructor(){
    super()
    this.state={
      option: {
        title: {
            text: '全国销售总量'
        },
        
        legend: {
            data: ['华东', '华北', '华南', '西部', '其他']
        },
        
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2017-12-27', '2017-12-28', '2017-12-29', '2017-12-30', '2017-12-31', '2018-1-1']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '华东',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '华北',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '华南',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '西部',
                type: 'line',
                stack: '总量',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '其他',
                type: 'line',
                stack: '总量',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    }
    }
  }
  render(h) {
    return(
      <div style={{width:'629px',height:'300px'}} >
        
        <ReactEcharts option={this.state.option}></ReactEcharts>
      </div>
    )
  }
}
export default Line;
