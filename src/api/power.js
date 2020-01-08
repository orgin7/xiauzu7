import axios from "../utils/axios"

export var getPower=()=>{
    return new Promise((resolve,reject)=>{
        let url ="http://localhost:3000/77/power/get"
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
        let url ="http://localhost:3000/77/power/del"
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
        let url ="http://localhost:3000/77/power/add"
        axios.post(url,{user:name,dev:dev})
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
        let url ="http://localhost:3000/77/power/updata"
        axios.post(url,{_id:_id,user:name,dev:dev})
        .then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}