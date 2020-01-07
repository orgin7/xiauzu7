import axios from '../utils/axios'
import {getItem} from '../utils/webStorage'

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