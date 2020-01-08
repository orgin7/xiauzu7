// 用户所有的权限列表
export default [
   {
     name:'首页',
     icon:'home',
     path:'/admin/home',
     id:'0'
   },
   {
     name:'权限管理',
     icon:'setting',
     path:'/admin/power',
     id:'1',
     children:[
       {
         name:"角色列表",
         icon:"setting",
         path:"/admin/power/role",
         id:"1-0"
       },
       {
        name:"权限列表",
        icon:"setting",
        path:"/admin/power/right",
        id:"1-1"
       }
     ]
   },
   {
     name:'商品管理',
     icon:"",
     path:'',
     id:'2',
     children:[
       {
         name:'商品列表',
         path:'/admin/goods/list',
         id:'2-0'
       },
       {
         name:'商品添加',
         path:'/admin/goods/add',
         id:'2-1'
       }
     ]
   }
 ]