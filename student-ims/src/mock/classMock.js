import Mock from 'mockjs'

//  匹配字符串
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

const name = [
  '致远班',
  '明志班',
  '领航班',
  '超越班',
  '英华班',
  '倩英班',
  '奋飞班',
  '笃学班',
  '十八层',
  '凌志班',
  '厉行班',
  '雄鹰班'
]
for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: '@increment',
      classNo: 201900 + parseInt(`${i + 1}`),
      className: name[i],
      'classSize|30-40': 40,
      classTeacher: '@cname'
    })
  )
}

export default {
  addClass (config) {
    const { className, classSize, classTeacher } = param2Obj(config.url)
    list.push({
      classNo: '@increment(20190)',
      className: className,
      classSize: classSize,
      classTeacher: classTeacher
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  deleteClass (config) {
    const { classNo } = param2Obj(config.url)
    if (!classNo) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      list = list.filter(item => item.classNo !== classNo)
      return {
        code: 20000,
        data: {
          message: '删除成功'
        }
      }
    }
  },
  updateClass (config) {
    const { classNo, className, classSize, classTeacher } = param2Obj(config.url)
    list.some(item => {
      if (item.classNo === classNo) {
        item.className = className
        item.classSize = classSize
        item.classTeacher = classTeacher
      }
    })
    return {
      code: 20000,
      data: {
        message: '更新成功'
      }
    }
  },
  getClassList (config) {
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
  searchClass (config) {}
}
