import Mock from 'mockjs'

import Class from '@/mock/classMock'
import Student from '@/mock/studentMock'

//  设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300 - 600'
})

// 班级的增删改查

//  新增班级信息
Mock.mock(/\/class\/add/, 'get', Class.addClass)

//  删除班级信息
Mock.mock(/\/class\/delete/, 'get', Class.deleteClass)

//  更新班级信息
Mock.mock(/\/class\/update/, 'get', Class.updateClass)

//  获取班级列表
Mock.mock(/\/class\/list/, 'get', Class.getClassList)

//  根据班级名称查询班级信息
Mock.mock(/\/class\/search/, 'get', Class.searchClass)

//  学生的增删改查
Mock.mock(/\/student\/add/, 'get', Student.addStudent)

//  删除学生信息
Mock.mock(/\/student\/delete/, 'get', Student.deleteStudent)

//  更新学生信息
Mock.mock(/\/student\/update/, 'get', Student.updateStudent)

//  获取学生列表
Mock.mock(/\/student\/list/, 'get', Student.getStudentList)

//  根据学生名称查询学生信息
Mock.mock(/\/student\/search/, 'get', Student.searchStudent)
