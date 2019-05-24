import Mock from 'mockjs'

import Class from '@/mock/classMock'
import Student from '@/mock/studentMock'

//  设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300 - 600'
})

// 班级的增删改查

//  新增班级信息
Mock.mock(/\/class\/add/, 'post', Class.addClass)

//  删除班级信息
Mock.mock(/\/class\/delete/, 'post', Class.deleteClass)

//  更新班级信息
Mock.mock(/\/class\/update/, 'post', Class.updateClass)

//  获取班级列表
Mock.mock(/\/class\/list/, 'post', Class.getClassList)

//  学生的增删改查
Mock.mock(/\/student\/add/, 'post', Student.addStudent)

//  删除学生信息
Mock.mock(/\/student\/delete/, 'post', Student.deleteStudent)

//  更新学生信息
Mock.mock(/\/student\/update/, 'post', Student.updateStudent)

//  获取学生列表
Mock.mock(/\/student\/list/, 'post', Student.getStudentList)
