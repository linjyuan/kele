# DPC Core Vue 项目说明

## 一、开发流程

> 注意：node版本要求 >= 18

第一步，安装`pnpm`

```bash
npm install pnpm -g
```

第二步，安装依赖

```bash
pnpm install
```

最后，执行启动命令

```bash
pnpm dev # 本地开发命令
```

> 清理 npm/pnpm 缓存：
> 缓存中的旧数据有时可能会导致安装问题。你可以尝试清理 npm 或 pnpm 的缓存。
> 对于 npm，可以使用命令 npm cache clean --force。
> 对于 pnpm，可以使用 pnpm store prune。

打包命令

```bash
# 开发环境构建
pnpm build

# 测试环境构建
pnpm build:test

# 生产环境构建
pnpm build:prod

```

## 二、开发调试

### 1、.env文件中配置环境变量、代理地址

```bash
# apps\kele_app\ 下的文件
.env.development  # 开发环境
.env.production   # 生产环境
...               # 其他
```

环境变量



### 2、本地调试地址

```bash
# pc端页面调试地址，登陆信息从代理系统获取
http://localhost:5174/#/index/login
# 移动端页面调试地址
http://localhost:5174/#/home
```

### 3、项目结构

```bash
kele
├── apps
│   └── kele_app    # kele应用
│       ├── .vscode
│       │   └── extensions.json
│       ├── public
│       │   └── favicon.ico
│       ├── src
│       │   ├── api # 接口文件
│       │   ├── assets
│       │   ├── components # 组件
│       │   ├── http
│       │   ├── router
│       │   ├── stores
│       │   ├── styles
│       │   ├── typings
│       │   ├── utils
│       │   ├── views
│       │   ├── App.vue # 根组件
│       │   └── main.ts # 入口文件
│       ├── .editorconfig
│       ├── .env.development
│       ├── .env.production
│       ├── .prettierrc.json    # pretter 格式化代码配置文件
│       ├── README.md
│       ├── auto-imports.d.ts   #自动导入自动生成的配置，可忽略
│       ├── components.d.ts #自动导入自动生成的配置，可忽略
│       ├── env.d.ts
│       ├── eslint.config.js    # eslint配置文件
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.app.json
│       ├── tsconfig.json   # ts配置文件
│       ├── tsconfig.node.json
│       └── vite.config.ts  # vite配置文件
├── packages
│   ├── kele    #kele脚手架
│   │   ├── bin
│   │   │   └── index.ts
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── typings.d.ts
│   ├── tools   # 可乐工具类
│   │   └── package.json
│   └── ui  # 可乐组件库
│       ├── src
│       │   ├── compoents
│       │   ├── index.ts
│       │   └── vue-shims.d.ts
│       ├── package.json
│       ├── rollup.config.js
│       ├── tsconfig.json
│       └── typings.d.ts
├── README.md
├── dockerfile
├── nginx.conf  # nginx配置文件
├── package.json
├── pnpm-lock.yaml  # pnpm依赖锁文件
└── pnpm-workspace.yaml # monorepop配置
...
```

## 三、外系统对接



## 四、关键的代码逻辑


## 五、分支管理

1、测试主分支：master

