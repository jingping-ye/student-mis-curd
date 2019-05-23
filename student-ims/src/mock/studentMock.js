import Mock from 'mockjs'

//  解析url
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

let list = []
const count = 12

for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: '@increment',
      stuNo: 20220000 + parseInt(`${i + 1}`),
      stuName: '@cname',
      stuGender: '@integer(0,1)',
      stuPhone: /^1[0-9]{10}$/,
      stuBirthday: '@date("yyy-mm-dd")',
      'classNo|201901-201912': 201912
    })
  )
}

export default {
  addStudent (config) {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)
    const mockList = list.filter(user => {
      if (name && user.name.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      data: pageList
    }
  },
  deleteStudent (config) {},
  updateStudent (config) {},
  getStudentList (config) {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)
    const mockList = list.filter(item => {
      if (name && item.name.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      data: pageList
    }
  },
  searchStudent (config) {}
}
