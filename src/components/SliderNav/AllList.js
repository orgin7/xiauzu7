// 用户所有的权限列表
export default [
  {
    name: '首页',
    icon: 'home',
    path: '/admin/home',
    id: '0'
  },
  {
    name: '权限管理',
    icon: 'setting',
    path: '/admin/power',
    id: '1',
    children: [
      {
        name: "角色列表",
        icon: "setting",
        path: "/admin/power/role",
        id: "1-0"
      },
      {
        name: "权限列表",
        icon: "setting",
        path: "/admin/power/right",
        id: "1-1"
      }
    ]
  },
  {
    name: '用户管理',
    icon: 'user',
    id: '1',
    children: [
      {
        name: '用户列表',
        icon: 'user',
        id: '1-0',
        path: '/admin/user/list'
      },
      {
        name: '添加用户',
        icon: 'user-add',
        id: '1-1',
        path: '/admin/user/add'
      },
      {
        name: '移除用户',
        icon: 'user-delete',
        id: '1-2',
        path: '/admin/user/del'
      },
    ]
  },
  {
    name: '商品管理',
    icon: "",
    path: '',
    id: '2',
    children: [
      {
        name: '商品列表',
        path: '/admin/goods/list',
        id: '2-0'
      },
      {
        name: '商品添加',
        path: '/admin/goods/add',
        id: '2-1'
      }
    ]
  },
  {
    name: '数据统计',
    icon: '',
    path: '',
    id: '3',
    children: [
      {
        name: '数据报表',
        path: '/admin/data/dataing',
        id: '3-0'
      }
    ]
  }
]


