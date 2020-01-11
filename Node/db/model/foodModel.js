// 创建和用户表相关的数据模型


const mongoose = require('mongoose')
let foodSchema= mongoose.Schema({
    num:{ type:String,required:true },
    _id:{ type:String,required:true },
    number:{ type:String,required:true },
    price:{ type:String,required:true },  //图片的路径  图片的base64数据
    pay:{ type:String,required:true },
    trans:{ type:String,required:true },
   
})
let  foodModel = mongoose.model('sends',foodSchema)

module.exports = foodModel