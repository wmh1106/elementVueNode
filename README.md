## 目录结构

```
├── app.js 入口文件
├── db 数据库存储目录
├── models 数据库模型文件目录
├── node_modules 第三方模块
├── package.json 
├── public 公共文件目录
├── routers 路由文件目录
├── schemas 数据库结构文件目录
├── views 模板视图文件目录
└── yarn.lock
```

## 模块：根据功能进行模块划分

- 前台模块 `app.use('/admin',require('./router/admin'))`
  1. 首页页面
  2. 内容页面
- 后台模块 `app.use('/api',require('./router/api'))`
  1. 首页：
    - `/`
  2. 分类管理
    - `/category` 分类列表
    - `/category/add` 分类添加
    - `/category/edit` 分类修改
    - `/category/delete` 分类删除
  3. 文章内容管理
    - `/article` 内容列表
    - `/article/add` 内容添加
    - `/article/edit` 内容修改
    - `/article/delete` 内容删除
  4. 评论内容管理
    - `/comment` 评论列表
    - `/comment/delete` 评论删除
- API 模块 `app.use('/',require('./router/main'))`
  1. `/`首页
  2. `register` 用户注册
  3. `login` 用户登录
  4. `comment` 评论获取
  5. `comment/post` 评论提交

## 开发顺序

- 用户
- 栏目
- 内容
- 评论

## 开启数据库 mongodb

mongod --dbpath=/xxx/xxx --port=27017


