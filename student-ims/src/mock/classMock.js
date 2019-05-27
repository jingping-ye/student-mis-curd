import Mock from 'mockjs';

let list = [];
const count = 12;

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
];
for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: '@increment',
      classNo: 201900 + parseInt(`${i + 1}`),
      className: name[i],
      'classSize|30-40': 40,
      classTeacher: '@cname'
    })
  );
}

export default {
  addClass (config) {
    const { className, classSize, classTeacher } = JSON.parse(config.body);
    list.push({
      id: list[list.length - 1].id + 1,
      classNo: list[list.length - 1].classNo + 1,
      className: className,
      classSize: classSize,
      classTeacher: classTeacher
    });
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    };
  },
  deleteClass (config) {
    const { id } = JSON.parse(config.body);
    list = list.filter(item => item.id !== parseInt(id));
    return {
      code: 20000,
      data: {
        message: '删除成功'
      }
    };
  },
  updateClass (config) {
    const { id, className, classSize, classTeacher } = JSON.parse(config.body);
    list.some(item => {
      if (item.id === id) {
        item.className = className;
        item.classSize = classSize;
        item.classTeacher = classTeacher;
      }
    });
    return {
      code: 20000,
      data: {
        message: '更新成功'
      }
    };
  },
  getClassList (config) {
    let { queryStr, page = 1, limit = 10 } = JSON.parse(config.body);
    //  计算总数
    const mockList = queryStr.length > 0 ? list.filter(item => item.className.includes(queryStr)) : list;

    //  数据分页
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
    return {
      code: 20000,
      count: mockList.length,
      data: pageList
    };
  }
};
