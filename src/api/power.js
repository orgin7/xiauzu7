import axios from "../utils/axios"

export var getPower=()=>{
    return new Promise((resolve,reject)=>{
        let url ="http://10.60.14.76:3003/v1/admin/user/getUser"
        axios.post(url)
        .then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}
export var delPower=(_id)=>{
    return new Promise((resolve,reject)=>{
        let url ="http://10.60.14.76:3003/v1/admin/user/delUser"
        // console.log(_id)
        axios.post(url,{_id})
        .then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}
export var addPower=(name,dev)=>{
    return new Promise((resolve,reject)=>{
        let url ="http://10.60.14.76:3003/v1/admin/user/reg"
        axios.post(url,{userName:name,dev:dev})
        .then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}
export var updataPower=(_id,name,dev)=>{
    return new Promise((resolve,reject)=>{
        let url ="http://10.60.14.76:3003/v1/admin/user/updateUser"
        axios.post(url,{_id:_id,userName:name,dev:dev})
        .then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}
export var ByKwPower=(kw)=>{
    return new Promise((resolve,reject)=>{
        let url ="http://10.60.14.76:3003/v1/admin/user/getUserByKw"
        axios.post(url,{kw:kw})
        .then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}