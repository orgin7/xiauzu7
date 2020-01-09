const jwt  = require('../utils/jwt')
module.exports= (req,res,next)=>{
  console.log('token',req.headers)
  var arr =['/user/login','/user/reg','/user/getUser']
  if(arr.indexOf(req.path)!==-1){
    next()
  }else{
    let {token}=req.body 
    console.log(token)
    if(!token) return res.send({err:-997,msg:'token缺失'})
    try {
      jwt.verifyToken(token)
      next()
    } catch (error) { 
      res.send({err:-998,msg:'token失效'})
    }
  
  }
}