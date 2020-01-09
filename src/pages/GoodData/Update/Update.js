import React, {Fragment,Component} from 'react'
import {Button, message ,Card, Form, Input,Upload,Icon} from 'antd'
import styles from './update.module.less'
import {updateGoods} from '../../../api/api'
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
class GoodsUpdate extends Component{
    constructor(props){
        super();
        this.state = {name:props.updataInfo.name,
            desc:props.updataInfo.desc,
            foodType:props.updataInfo.foodType,
            price:props.updataInfo.price,
            img:props.updataInfo.img,
            loading: false,
            img:props.updataInfo.img,
            _id:props.updataInfo._id}
        // console.log(this)
    }
    componentWillReceiveProps(props){
        console.log('props改变',props)
        
        this.setState({name:props.updataInfo.name,
                        desc:props.updataInfo.desc,
                        foodType:props.updataInfo.foodType,
                        price:props.updataInfo.price,
                        imageUrl:props.updataInfo.img,
                        _id:props.updataInfo._id})
        // console.log(this.state.imageUrl)
        // this.handleChange()
    }
    submit = ()=>{
        let {getFieldsValue, validateFields} = this.props.form
        validateFields((err, data)=>{
            if(!this.state.img) return message.info('请先上传图片',1)
            data.img = this.state.img
            data._id = this.state._id
            console.log(data)
            if(err) return message.error('商品信息有误!',1)
            updateGoods(data).then((res)=>{
                message.success('修改成功',1)
                this.props.refreshList()
            })
        })
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, img =>
            this.setState({
              img,
              loading: false,
            }),
          );
        }
    };
    render(){
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">上传图片</div>
            </div>
        );
       
        let {getFieldDecorator} = this.props.form
        let {_id,name,desc,price,foodType,img}  = this.state
       return (
        <Card title='更新商品信息'> 
        <Form.Item label="商品名称">
            {getFieldDecorator('name',{
                initialValue:name,
                 rules: [{ required: true, message: '商品名称不能为空!' },]
            })(
                <Input type='text'  />
            )}
        </Form.Item>

        <Form.Item label="商品价格">
            {getFieldDecorator('price',{
                initialValue:price,
                 rules: [{ required: true, message: '商品价格不能为空!' },]
            })(
                <Input type='number' placeholder='请输入数字'/>
            )}
        </Form.Item>

        <Form.Item label="商品类型">
            {getFieldDecorator('foodType',{
                 initialValue:foodType,
                 rules: [{ required: true, message: '商品类型不能为空!' },]
            })(
                <Input type='text' />
            )}
        </Form.Item> 
        <Form.Item label="商品描述">
            {getFieldDecorator('desc',{
                 initialValue:desc,
                 rules: [{ required: true, message: '商品描述不能为空!' },]
            })(
                <Input />
            )}
        </Form.Item>          
        缩略图: 
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {img ? <img src={img} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
            
            
            <Button type="primary" onClick={this.submit}>修改商品</Button>
            
        </Card>
       ) 
    }
}
export default Form.create()(GoodsUpdate)