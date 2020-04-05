// 路由懒加载方式导入组件
const Home = () => import('@/views/home/Home.vue')
const Login = () => import('@/views/login/Login.vue')
const Login1 = () => import('@/views/login/Login1.vue')

export default [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      name: "登陆",
    },
  },
  {
    path: "/",
    name: "index",
    component: Home,
    meta: {
      name: "系统概览",
      icon: "el-icon-menu"
    },
  },
  {
    path: "/inspect",
    name: "inspect",
    component: Home,
    meta: {
      name: "设备巡检",
      icon: "el-icon-document"
    },
    children: [
      {
        path: "/netreport",
        name: "netreport",
        meta: {
          name: "网络报告",
          icon: "el-icon-menu"
        }
      },
      {
        path: "/cloudreport",
        name: "cloudreport",
        meta: {
          name: "主机报告",
          icon: "el-icon-menu"
        }
      },
    ]
  },
  {
    path: "/security",
    name: "security",
    component: Home,
    meta: {
      name: "安全管理",
      icon: "el-icon-setting"
    },
    children: [
      {
        path: "/sip",
        name: "sip",
        meta: {
          name: "态势感知",
          icon: "el-icon-menu"
        }
      },
      {
        path: "/line",
        name: "line",
        meta: {
          name: "基线核查",
          icon: "el-icon-menu"
        }
      },
      {
        path: "/policy",
        name: "policy",
        component: () => import("@/views/policy/Policy"),
        meta: {
          name: "安全策略",
          icon: "el-icon-menu"
        }
      },
    ]
  },
  {
    path: '/event',
    name: 'event',
    component: Home,
    meta: {
      name: "事件记录",
      icon: "el-icon-document"
    },
    children: [
      {
        path: "/mobile",
        name: "mobile",
        component: () => import("@/views/mobile/MobileIndex"),
        meta: {
          name: "终端事件",
          icon: "el-icon-s-management"
        }
      },
      {
        path: "/change",
        name: "change",
        component: () => import("@/views/change/ChangeIndex"),
        meta: {
          name: "配置变更",
          icon: "el-icon-s-management"
        }
      },
      {
        path: "/fault",
        name: "fault",

        meta: {
          name: "故障报告",
          icon: "el-icon-s-management"
        }
      }
    ]
  },
  {
    path: "/assets",
    name: "assets",
    meta: {
      name: "资产管理",
      icon: "el-icon-finished"
    }
  },
  {
    path: "/config",
    name: "config",
    meta: {
      name: "配置备份",
      icon: "el-icon-folder-add"
    }
  },
  {
    path: "/doc",
    name: "doc",
    component: Home,
    meta: {
      name: "用户管理",
      icon: "el-icon-files"
    },
    children: [
      {
        path: "/person",
        name: "person",

        meta: {
          name: "运维人员",
          icon: "el-icon-s-management"
        }
      }
    ]
  }
]
