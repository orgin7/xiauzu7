const express=require("express");
const app=express();
const path=require('path');
// post 数据解析
const  bodyParser= require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/******************   mongodb   ********************/
const db=require("./db/connect.js");

/******************   static   ********************/
app.use('/static', express.static(path.join(__dirname, 'public')))

/******************   router config   ********************/
app.all("/*", function(req, res, next) {
	// 跨域处理
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
	})
// 管理平台接口
const admin = require('./admin/admin')
const tokenMiddleWare = require('./middleware/token')
app.use('/v1/admin',tokenMiddleWare,admin)
app.listen(3003,(res)=>{
	console.log('server start in '+3000)
})
