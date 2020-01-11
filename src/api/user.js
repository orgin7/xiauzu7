import axios from '../utils/axios'
//注册
import {getItem} from '../utils/webStorage'
export const userReg= async (params)=>{
   let url='/user/v1/admin/user/reg'
   let {userName,passWord,age,phone,address,email,dev}=params
   let result=await axios.post(url,{userName,passWord,age,phone,address,email,dev})
   if(result.err==0){
      return result
   }
   else{
      throw result
   }
}
//查询
export const userGet= async (page,pageSize)=>{
   let url='/user/v1/admin/user/getUser'
   let result=await axios.post(url,{page,pageSize})
   if(result.err==0){
      return result
   }
   else{
      throw result
   }
}

//删除用户
export const userDel= async (_id)=>{
   let url='/user/v1/admin/user/delUser'
   let result=await axios.post(url,{_id})
   if(result.err==0){
      return result
   }
   else{
      throw result
   }
}

//更新
export const userUpdate= async ({_id,userName,age,phone,address,email})=>{
   // console.log(_id,userName,age,phone,address,email)
   let url='/user/v1/admin/user/updateUser'
   let result=await axios.post(url,{_id,userName,age,phone,address,email})
   if(result.err==0){
      return result
   }
   else{
      throw result
   }
}

//关键字查询
export const vagurSearch= async (kw,page,pageSize)=>{
   // console.log(kw,page,pageSize)
   // storage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg0MDI3MjcsImV4cCI6MTU3ODQwNjMyN30.JbJj1wW-a_uF21J4-VV4STSJf67uk3f9Pj-cac-cfw8')
   let url='/user/v1/admin/user/getUserByKw'
   let result=await axios.post(url,{kw,page,pageSize})
   if(result.err==0){
      return result
   }
   else{
      throw result
   }

}
//登录接口
export const UserLogin=(userName,passWord)=>{
    return new Promise((resolve,reject)=>{
        let url = '/hehe/v1/admin/user/login'
        axios.post(url,{userName,passWord})
        .then((res)=>{
            if(res.err==0){
                resolve(res)
            }else{
                reject(res)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
}
//登出接口
export const UserLogout = async ()=>{
    let url = '/hehe/v1/admin/user/logout'
    let uid = getItem('uid')||''
    let result = await axios.post(url,{uid})
    if(result.err == 0){
        return result
    }else{
        throw result
    }
}