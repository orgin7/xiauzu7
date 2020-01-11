// 用户所有的权限列表
export default [
 
  {
    name: '首页',
    icon: 'home',
    path: '/admin/home',
    id: '0'
  },
  {
    name: '用户管理',
    icon: 'user',
    path:'/admin/user',
    id: '2',
  },
  {
    name: '权限管理',
    icon: 'setting',
    path: '/admin/power',
    id: '2',
    children: [
      {
        name: "角色列表",
        icon: "setting",
        path: "/admin/power/role",
        id: "2-0"
      },
      {
        name: "权限列表",
        icon: "setting",
        path: "/admin/power/right",
        id: "2-1"
      }
    ]
  },
  {
    name: '商品管理',
    icon: "",
    path: '',
    id: '3',
    children: [
      {
        name: '商品列表',
        path: '/admin/goods/list',
        id: '3-0'
      },
      {
        name: '商品添加',
        path: '/admin/goods/add',
        id: '3-1'
      }
    ]
  },
   {
    name:'订单管理',
    icon:'check-circle',
    id:'5',
    path:'',
    children:[
     { name:'订单列表',
      path:'/admin/document/list',
      icon:'smile',
      id:'5-0'} 
     ]
    }
,
]


