import Mock from 'mockjs';

let list = [];
const count = 100;

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
  );
}

export default {
  addStudent (config) {
    const { classNo, stuBirthday, stuGender, stuName, stuPhone } = JSON.parse(config.body);
    list.push({
      id: list[list.length - 1].id + 1,
      stuNo: list[list.length - 1].stuNo + 1,
      classNo: classNo,
      stuBirthday: stuBirthday,
      stuGender: stuGender,
      stuName: stuName,
      stuPhone: stuPhone
    });
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    };
  },
  deleteStudent (config) {
    const { id } = JSON.parse(config.body);
    list = list.filter(item => item.id !== parseInt(id));
    return {
      code: 20000,
      data: {
        message: '删除成功'
      }
    };
  },
  updateStudent (config) {
    const { id, classNo, stuBirthday, stuGender, stuName, stuPhone } = JSON.parse(config.body);
    list.some(item => {
      if (item.id === id) {
        item.classNo = classNo;
        item.stuBirthday = stuBirthday;
        item.stuGender = stuGender;
        item.stuName = stuName;
        item.stuPhone = stuPhone;
      }
    });
    return {
      code: 20000,
      data: {
        message: '更新成功'
      }
    };
  },
  getStudentList (config) {
    let { queryStr, page = 1, limit = 10 } = JSON.parse(config.body);
    //  计算总数
    const mockList = queryStr.length > 0 ? list.filter(item => item.stuName.includes(queryStr)) : list;

    //  数据分页
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
    return {
      code: 20000,
      count: mockList.length,
      data: pageList
    };
  },
  searchStudent (config) {}
};
