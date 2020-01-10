import axios from '../../../utils/axios'
import React,{Component} from 'react'

export const GetGoods = async (page,pageSize)=>{
    let url='/hello/v1/admin/food/getFoods'
    let result = await axios.post(url,{page,pageSize})
    if(result.err==0){
      return result
    }else{
      throw result
    }
  }

  export const UpdateGood = async (props)=>{
    let url='/hello/v1/admin/food/updateFood'
    let {_id,num,pay,trans,number} = props
    // let foodId=_id
    console.log(_id,num,pay,trans,number)
    let result = await axios.post(url,{_id,num,pay,trans,number})
    if(result.err==0){
      return result
    }else{
      throw result
    }
  }

  export const SearchGood = async (kw, nowPage, pageSize)=>{
    let url='/hello/v1/admin/food/getFoodsByKw'
    // let foodId=_id
    let result = await axios.post(url,{kw, nowPage, pageSize})
    if(result.err==0){
      return result
    }else{
      throw result
    }
  }

