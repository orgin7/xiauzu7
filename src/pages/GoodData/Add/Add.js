import React, { Component,Fragment } from 'react';
import styles from './Add.module.less'
import {addGood} from '../../../api/api'
import {Button,message,Input, Form, Icon,Card, Checkbox,InputNumber,Upload } from 'antd'
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt200M = file.size / 1024 / 1024 < 200;
    if (!isLt200M) {
      message.error('Image must smaller than 200MB!');
    }
    return isJpgOrPng && isLt200M;
}
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
class GoodsAdd extends Component{
    constructor(){
        super()
        this.state = {
            imageUrl:null,
        }
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
    };
    add=()=>{
        let {getFieldsValue, validateFields} = this.props.form
        validateFields((err, data)=>{
            // console.log(err,data);
            if(!this.state.imageUrl) return message.info('请先上传图片',1)
            data.img = this.state.imageUrl
            // console.log(data.img)
            if(err) return message.error('商品信息有误!',1)
            addGood(data).then((res)=>{
                message.success('添加成功',1)
            })
        })
    }
    render(){
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">上传图片</div>
            </div>
        );
        let {getFieldDecorator} = this.props.form
        let {imageUrl} = this.state
        return (
            <div className={styles.goodsAdd}>
                <Card title='添加商品信息'> 
                    <Form.Item label="商品名称">
                        {getFieldDecorator('name',{
                             rules: [{ required: true, message: '商品名称不能为空!' },]
                        })(
                            <Input type='text'/>
                        )}
                    </Form.Item>

                    <Form.Item label="商品价格">
                        {getFieldDecorator('price',{
                             rules: [{ required: true, message: '商品价格不能为空!' },]
                        })(
                            <Input type='number' placeholder='请输入数字'/>
                        )}
                    </Form.Item>

                    <Form.Item label="商品类型">
                        {getFieldDecorator('foodType',{
                             rules: [{ required: true, message: '商品类型不能为空!' },]
                        })(
                            <Input type='text'/>
                        )}
                    </Form.Item> 
                    <Form.Item label="商品描述">
                        {getFieldDecorator('desc',{
                             rules: [{ required: true, message: '商品描述不能为空!' },]
                        })(
                            <Input/>
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
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }}/> : uploadButton}
                    </Upload>
                        <Button type="primary" onClick={this.add}>添加商品</Button>
                        
                    </Card>   
                 </div>   
        )
    }
}
export default Form.create()(GoodsAdd)