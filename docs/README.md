# 学生管理系统(curd)

## 一、技术要求

vue.js 2.x + mock.js

## 二、数据库设计

### （一）班级数据库表

| 字段名称     | 中文释义 | 字段类型 | 长度 |
| ------------ | -------- | -------- | ---- |
| className    | 班级名称 | string   | 10   |
| classNo      | 班级编号 | number   | 6    |
| classSize    | 班级人数 | number   | 3    |
| classTeacher | 班主任   | string   | 6    |

### （二）学生数据库表

| 字段名称    | 中文释义 | 字段类型 | 长度 | 备注                    |
| ----------- | -------- | -------- | ---- | ----------------------- |
| stuNo       | 学号     | number   | 8    |                         |
| stuName     | 学生姓名 | string   | 6    |                         |
| stuGender   | 性别     | number   | 1    | 返回 0 或 1 ，0 男 1 女 |
| stuPhone    | 手机号   | number   | 13   |                         |
| stuBirthday | 出生日期 | string   | 10   | 格式:2019-05-22         |
| classNo     | 所属班级 | number   | 6    |                         |

## 三、原型图

[学生管理信息系统 curd 原型图](https://www.processon.com/view/link/5ce56a4ae4b00f0c2b5d888e)

## 四、git 仓库和分支的建立

1. 在 github 上新建 student-mis-curd 仓库
2. 提交 docs 文档，配置相关环境
3. 根据 master ，在master时要配置相关分支，新建 release 分支和 develop 分支，建立一个`姓名/内容`分支用于个人开发

## 五、vscode 环境搭建和配置

1. 下载扩展
   - eslinet
   - vetur
   - prettier
2. npm 安装 vue-cli 并去除默认样式
3. 安装相关依赖

- element-ui
- axios
- mock.js

4. 安装 mock.js 并提供模拟数据

## 六、功能实现

### （一）学生管理

1. 增加学生

   点击按钮在表格上方新增新行

2. 删除学生

   弹出确认框确认

3. 修改学生信息

   确认时验证信息并发送

4. 查询学生信息

   向后台发送数据并刷新列表

5. 翻页

### （二）班级管理

1. 增加学生

   点击按钮在表格上方新增新行

2. 删除学生

   弹出确认框确认

3. 修改学生信息

   确认时验证信息并发送

4. 查询学生信息

   向后台发送数据并刷新列表

5. 翻页
