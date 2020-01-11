// 存放和食品 数据操作的相关信息 数据库的操作
const FoodModel= require('../db/model/foodModel')
async function  add(num,_id,number,price,pay,trans){
  // async 函数内部只要不出错 肯定走的是then 如果出错走的是catch
   let result =await FoodModel.insertMany({num,_id,number,price,pay,trans})
   console.log(result)
}
async function get(page,pageSize){
  // 获取总的食品数据数组
  let allFoods =await FoodModel.find()
  console.log(allFoods)
  // 获取视食品数据 总数量
  let allCount =allFoods.length 
  let foods = await FoodModel.find().skip((page-1)*pageSize).limit(pageSize)
  return  {foods,allCount}
}

// 分类查询+分页
async function getByType(trans,page,pageSize){
  let allFoods=await FoodModel.find({trans})
  let allCount=allFoods.length 
  let  foods=await FoodModel.find({trans}).skip((page-1)*pageSize).limit(pageSize)
  return {foods,allCount}
}
// 关键字查询+分页
async function getByKw(kw,page,pageSize){
 let regex=new RegExp(kw) //查询关键字的正则 
 let  allFoods=await FoodModel.find({$or:[{num:{$regex:regex}},{pay:{$regex:regex}}]})
 let  allCount = allFoods.length
 let  foods=await FoodModel.find({$or:[{num:{$regex:regex}},{pay:{$regex:regex}}]}).skip((page-1)*pageSize).limit(pageSize)
 return {foods,allCount}
}

// 删除
async function del(_id){
  let result = await  FoodModel.deleteOne({_id:_id})
  return result
}

// 修改
async function  update(_id,num,pay,trans,number){
  // console.log(_id,num,pay,trans,number)
  
try {
  let result  = await FoodModel.updateOne({_id:_id},{num,pay,trans,number})
} catch (error) {
  console.log(error)
}
  let result  = await FoodModel.updateOne({_id:_id},{num,pay,trans,number})
   console.log(result)
   return  result
}
module.exports={add,get,getByType,getByKw,del,update}