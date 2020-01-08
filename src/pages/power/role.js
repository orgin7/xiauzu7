import React,{Fragment,Component} from 'react'
import { Input,Button,Modal} from 'antd';
import Rtable from "../../components/SliderNav/table/roleTable"
import {addPower} from "../../api/power"
const { Search } = Input;

class Role extends Component{
   constructor(){
      super()
      this.state={
         loading: false,
         visible: false,
      }
   }
   showModal = () => {
      this.setState({
        visible: true,
      });
    };
    handleOk = () => {
      this.setState({ visible: false });
    };
    handleCancel = () => {
      this.setState({ visible: false });
    };
    submit=()=>{
      let row1 = this.refs.row1.state.value
      let row2 = this.refs.row2.state.value
      addPower(row1,row2)
    }
    
   render(){
      const { visible } = this.state;
      
      return(
         <Fragment>
            <div>
               <Search placeholder="输入搜索" onSearch={value => console.log(value)} enterButton style={{ width: 400 }}/>
               <Modal
                  visible={visible}
                  title="添加列表"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={[
                     <Button key="back" onClick={this.handleCancel}>
                     返回
                     </Button>,
                     <Button key="submit" type="primary" onClick={()=>{
                        this.handleOk();
                        this.submit()
                     }}>
                     添加
                     </Button>,
                  ]}
               >
                 角色：<Input ref="row1"></Input>
                 角色角色描述：<Input ref="row2"></Input>
                 
               </Modal>
               <Button type="primary" shape="round" size="large" onClick={this.showModal}>添加</Button>
            </div>
            <Rtable></Rtable>
         </Fragment>
      )
   }
}
export default Role