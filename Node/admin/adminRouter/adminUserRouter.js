const express = require('express')
const router =express.Router()
const jwt = require('../../utils/jwt')
const adminModel = require('../../db/model/adminModel')
router.post('/login',(req,res)=>{
  let {userName,passWord} = req.body 
  // console.log(userName,passWord)
  let rootList=[]
  let token=null
  let _id=''
  adminModel.findOne({userName,passWord})
  .then((db)=>{
    if(!db) return  res.send({err:-1,msg:'login nook'})
    rootList=db.rootList
     _id=db._id
     token =jwt.createToken({},60*60)
    return adminModel.updateMany({_id},{token})
  })
  .then((db)=>{
    res.send({err:0,msg:'ok',token,rootList,uid:_id})
  })
})

router.post('/logout',(req,res)=>{
  let {uid} = req.body 
  let rootList=[]
  let token=null
  adminModel.updateMany({_id:uid},{token:''})
  .then(()=>{
    res.send({err:0,msg:'logout ok'})
  })
})
//注册
router.post('/reg',(req,res)=>{
  let {userName,passWord,age,phone,address,email} = req.body 
  // console.log(userName,passWord,age,phone,address,email)
  // console.log(userName)
  adminModel.find({userName})
  .then((list)=>{
    // console.log(list)
    if(list.length!==0){
      return res.send({err:-2,msg:'用户名已存在'})
    }
    else{
      adminModel.insertMany({userName,passWord,age,phone,address,email})
      .then((data)=>{
        // console.log(data)
        res.send({err:0,msg:'reg ok'})
      })
      .catch((err)=>{
        // console.log(err)
        res.send({err:-1,msg:'reg nook'})
      })
    }
  })
})
//获取数据
router.post('/getUser',(req,res)=>{
  let {page,pageSize} = req.body 
  // console.log(11111111)
  adminModel.find()
  .then((data)=>{
    console.log(data.length)
    let allCount =data.length
    adminModel.find().skip((page-1)*pageSize).limit(Number(pageSize))
    .then((user)=>{
      // console.log(user)
      res.send({err:0,msg:'获取 ok',list:user,allCount})
    })
  })
  .catch((err)=>{res.send({err:-1,msg:'获取 no ok'})
  })
})
//删除
router.post('/delUser',(req,res)=>{
  let  {_id}=req.body
  adminModel.deleteOne({_id})
  .then((data)=>{
    res.send({err:0,msg:'del ok'})
  })
  .catch((err)=>{ 
    res.send({err:-1,msg:'del nook'})
  })
})

//更新
router.post('/updateUser',(req,res)=>{
  let {_id,userName,age,phone,address,email} = req.body 
  console.log(_id,userName,age,phone,address,email)
  adminModel.updateOne({_id},{userName,age,phone,address,email})
  .then((data)=>{res.send({err:0,msg:'修改ok'})})
  .catch((data)=>{
    // console.log(data)
    res.send({err:-1,msg:'修改失败'})
  })
})
//关键字查询
router.post('/getUserByKw',(req,res)=>{
  let page=Number(req.body.page)||1
  let pageSize = Number(req.body.pageSize)||6
  let kw = req.body.kw 
  // console.log(page,pageSize,kw)
  let regex=new RegExp(kw) //查询关键字的正则 
  adminModel.find({$or:[{userName:{$regex:regex}},{email:{$regex:regex}},{age:{$regex:regex}},{phone:{$regex:regex}},{address:{$regex:regex}}]})
  .then((data)=>{
    let  allCount = data.length
    adminModel.find({$or:[{userName:{$regex:regex}},{email:{$regex:regex}},{age:{$regex:regex}},{phone:{$regex:regex}},{address:{$regex:regex}}]}).skip((page-1)*pageSize).limit(Number(pageSize))
    .then((user)=>{
      res.send({err:0,msg:'查询 ok',list:user,allCount})
    })
 })
})
module.exports=router
