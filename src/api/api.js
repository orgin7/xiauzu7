//添加数据
import axios from '../utils/axios'
export const addGood = async({name,price,img,foodType,desc})=>{
    let url = '/hello/v1/admin/food/addGoodsFood'
    let result = await axios.post(url, {name,price,img,foodType,desc})
    if(result.err == 0){
        return result
    }else{
        throw result
    }
}
//获取商品列表
export const getGoods = async(page, pageSize)=>{
    let url = '/hello/v1/admin/food/getGoodsFoods'
    let result = await axios.post(url, {page, pageSize})
    if(result.err == 0){
        return result
    }else{
        throw result
    }
}

//根据id删除数据
export const delGood = async(foodId)=>{
    let url = '/hello/v1/admin/food/delGoodsFood'
    let result = await axios.post(url, {foodId})
    if(result.err == 0){
        return result
    }else{
        throw result
    }
}

//更新数据
export const updateGoods = async({_id,name,price,img,foodType,desc})=>{
    let url = '/hello/v1/admin/food/updateGoodsFood'
    let foodId = _id
    let result = await axios.post(url, {foodId,name,price,img,foodType,desc})
    if(result.err == 0){
        return result
    }else{
        throw result
    }
}

//分类查询
export const getGoodsByType = async({page, pageSize,foodType})=>{
    let url = '/hello/v1/admin/food/getFoodsByGoodsType'
    let result = await axios.post(url, {page, pageSize,foodType})
    if(result.err == 0){
        return result
    }else{
        throw result
    }
}


//关键字查询
export const getGoodsByKw = async({page, pageSize,kw})=>{
    let url = '/hello/v1/admin/food/getFoodsByGoodsKw'
    let result = await axios.post(url, {page, pageSize,kw})
    if(result.err == 0){
        return result
    }else{
        throw result
    }
}