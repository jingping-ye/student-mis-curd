<template>
  <div class="stu-management">
    <!--顶部操作区-->
    <div class="operate-area">
      <div class="search-area">
        <el-input placeholder="请输入学生名称"
          v-model="searchCondition"
          style="width:280px;"
          clearable
          size="medium"
          @change="clearQueryCondition"
          @keyup.13.native="getTableData(true)"
          maxlength="20">
          <el-button slot="append"
            icon="el-icon-search"
            @click="getTableData(true)"></el-button>
        </el-input>
      </div>
      <el-button class="add-stu-btn"
        type="primary"
        :loading="status.rest.add"
        @click="addStu()"
        size="medium">新增学生</el-button>
    </div>
    <!--新增班级对话框-->
    <el-dialog title="新增学生"
      width="400px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="closeDialog"
      @closed="closedDialog"
      @open="openDialog">
      <div>
        <el-form label-width="6em"
          ref="ruleForm"
          :model="formData"
          :rules="rules">
          <el-col :span="24"
            style="height: 58px">
            <el-form-item label="姓名"
              prop="stuName">
              <el-input size="small"
                placeholder="请输入"
                v-model="formData.stuName"
                minlength="1"
                maxlength="10">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24"
            style="height: 58px">
            <el-form-item label="性别"
              prop="stuGender">
              <el-radio-group v-model="formData.stuGender"
                style="float:left;padding: 10px">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24"
            style="height: 58px">
            <el-form-item label="手机号"
              prop="stuPhone">
              <el-input size="small"
                placeholder="请输入"
                v-model="formData.stuPhone"
                :maxlength="11">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24"
            style="height: 58px">
            <el-form-item label="出生日期"
              prop="stuBirthday">
              <el-date-picker type="date"
                size="small"
                placeholder="选择日期"
                v-model="formData.stuBirthday"
                style="width: 100%;"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24"
            style="height: 58px">
            <el-form-item label="所属班级"
              prop="classNo">
              <el-select v-model="formData.classNo"
                placeholder="请选择"
                size="small"
                style="float:left">
                <el-option v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <span slot="footer"
          class="dialog-footer">
          <el-button @click="cancelAdd"
            size="small">取 消</el-button>
          <el-button type="primary"
            @click="submitStu"
            size="small">确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <el-table border
      stripe
      style="width: 100%"
      :cell-style="{ textAlign: 'center',fontSize: '14px',color: '#919191'}"
      v-loading="status.tableLoading"
      :data="tableData">
      <el-table-column type="index"
        width="50"
        label="序号"
        header-align="center">
      </el-table-column>
      <el-table-column label="学号"
        header-align="center"
        min-width="90"
        prop="stuNo">
      </el-table-column>
      <el-table-column label="姓名"
        header-align="center"
        min-width="130">
        <template slot-scope="scope">
          <el-input v-if="status.onEdit[scope.$index]"
            resize="none"
            maxlength="6"
            placeholder="请输入姓名"
            v-model="scope.row.stuName"
            size="small"
            style="width:90px;"
            @blur="validateFields('stuName',scope.row.stuName)">
          </el-input>
          <span v-else>{{scope.row.stuName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别"
        header-align="center"
        min-width="130">
        <template slot-scope="scope">
          <el-radio-group v-if="status.onEdit[scope.$index]"
            v-model="scope.row.stuGender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
          <span v-else>{{scope.row.stuGender===0?'男':'女'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号"
        header-align="center"
        min-width="150">
        <template slot-scope="scope">
          <el-input v-if="status.onEdit[scope.$index]"
            resize="none"
            maxlength="11"
            placeholder="请输入手机号"
            :autosize="{ minRows: 1, maxRows: 3 }"
            size="small"
            v-model="scope.row.stuPhone"
            @blur="validateFields('stuPhone',scope.row.stuPhone)">
          </el-input>
          <span v-else>{{scope.row.stuPhone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="出生日期"
        header-align="center"
        min-width="200">
        <template slot-scope="scope">
          <el-date-picker v-if="status.onEdit[scope.$index]"
            type="date"
            size="small"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            v-model="scope.row.stuBirthday"
            style="width: 100%;"></el-date-picker>
          <span v-else>{{scope.row.stuBirthday}}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属班级"
        header-align="center"
        min-width="150">
        <template slot-scope="scope">
          <el-select v-if="status.onEdit[scope.$index]"
            v-model="scope.row.classNo"
            placeholder="请选择"
            size="small"
            style="float:left">
            <el-option v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-else>{{scope.row.classNo}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button type="text"
            size="small"
            :loading="status.rest.save[scope.$index]"
            @click="updateList(scope.row,scope.$index,status.onEdit[scope.$index])">{{!status.onEdit[scope.$index]?'编辑':'保存'}}</el-button>
          <el-button type="text"
            size="small"
            :loading="status.rest.del"
            v-show="status.onEdit[scope.$index]"
            @click="cancelUpdate(scope.row,scope.$index)">取消</el-button>
          <el-button type="text"
            size="small"
            :loading="status.rest.del"
            @click="delStu(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
      class="pagination-style"
      :current-page="pager.currentPage"
      :page-size="pager.pageSize"
      layout="total, prev, pager, next"
      :total="pager.total"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      tableDataCache: [],
      status: {
        tableLoading: false,
        onEdit: [],
        rest: {
          add: false,
          save: [],
          switch: [],
          del: false
        }
      },
      pager: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      visible: false,
      searchCondition: '',
      formData: {
        stuName: null,
        stuGender: 0,
        stuPhone: null,
        stuBirthday: new Date(),
        classNo: null
      },
      rules: {
        stuName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10个字符',
            trigger: 'blur'
          }
        ],
        classNo: [
          {
            required: true,
            message: '请选择班级编号',
            trigger: 'blur'
          }
        ],
        stuPhone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入11位手机号'
          }
        ]
      }
    }
  },
  computed: {
    options () {
      const classOption = []
      for (let i = 0; i < 12; i++) {
        classOption.push({
          value: 201901 + parseInt(i),
          label: 201900 + parseInt(i)
        })
      }
      return classOption
    }
  },
  watch: {},
  mounted () {
    this.getTableData(true)
  },
  methods: {
    openDialog () {},
    closeDialog () {
      this.visible = false
    },
    closedDialog () {
      this.resetForm()
    },
    addStu () {
      this.visible = true
    },
    cancelAdd () {
      this.visible = false
    },
    getTableData (needReset) {
      this.status.tableLoading = true
      if (needReset) {
        this.pager.currentPage = 1
      }
      const params = {
        page: this.pager.currentPage,
        limit: this.pager.pageSize,
        queryStr: this.searchCondition
      }
      this.$http
        .post('/api/student/list', params)
        .then(res => {
          this.pager.total = res.data.count
          this.tableData = res.data.data
          this.tableDataCache = JSON.parse(JSON.stringify(res.data.data))

          //  重置状态
          this.resetStatus()
          for (let i = 0, len = this.tableData.length; i < len; i++) {
            this.status.onEdit = [...this.status.onEdit, 0]
            this.status.rest.save = [...this.status.rest.save, false]
          }
          this.status.tableLoading = false
        })
        .catch(e => {
          console.log(e)
          this.status.tableLoading = false
        })
    },
    clearQueryCondition () {
      if (!this.searchCondition) {
        this.pager.currentPage = 1
        this.getTableData(false)
      }
    },
    delStu (row, index) {
      this.$confirm('确认删除学生?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.id
          }
          this.$http
            .post('/api/student/delete', params)
            .then(res => {
              if (res.data.code === 20000) {
                this.$message.success('删除成功!')
                this.$set(this.status.rest.save, index, false)
                this.$set(this.status.onEdit, index, 0)
                this.getTableData(false)
              }
            })
            .catch(e => {
              this.$set(this.status.rest.save, index, false)
              console.log(e)
            })
        })
        .catch(() => {
          this.$message.info('已取消删除!')
        })
    },
    updateList (row, index, onEdit) {
      if (!onEdit) {
        this.$set(this.status.onEdit, index, 1)
      } else {
        //  数据校验
        const validateRes =
          this.validateFields('stuName', row['stuName']) &&
          this.validateFields('stuPhone', row['stuPhone'])
        if (!validateRes) {
          return false
        }
        //  状态管理
        this.status.rest.save[index] = true
        //  数据提交
        this.$http
          .post('/api/student/update', row)
          .then(res => {
            if (res.data.code === 20000) {
              this.$message.success('更新成功')
              this.$set(this.status.rest.save, index, false)
              this.$set(this.status.onEdit, index, 0)
            }
          })
          .catch(e => {
            this.$set(this.status.rest.save, index, false)
            console.log(e)
          })
      }
    },
    cancelUpdate (row, index) {
      this.$set(this.status.onEdit, index, 0)
      this.tableData = JSON.parse(JSON.stringify(this.tableDataCache))
    },
    handleCurrentChange (val) {
      this.pager.currentPage = val
      this.getTableData(false)
    },
    submitStu () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http
            .post(`/api/student/add`, this.formData)
            .then(res => {
              if (res.data.code === 20000) {
                this.$message.success('添加成功!')
                this.visible = false
                this.resetForm()
                this.getTableData(true)
              }
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.formData = {
        stuName: null,
        stuGender: 0,
        stuPhone: null,
        stuBirthday: new Date(),
        classNo: null
      }
      this.$refs.ruleForm.resetFields()
    },
    resetStatus () {
      this.status.onEdit = []
      this.status.rest.save = []
    },
    validateFields (itemName, itemData) {
      if (itemName === 'stuName') {
        if (itemData.length < 2) {
          this.$message.warning('姓名必须在2个字以上!')
          return false
        }
        return true
      }
      if (itemName === 'stuPhone') {
        const isPhone = this.isPoneAvailable(itemData)
        if (!isPhone) {
          this.$message.warning('请输入正确的11位手机号!')
          return false
        }
        return true
      }
    },
    isPoneAvailable (phoneNumber) {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(parseInt(phoneNumber))) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style scoped>
.add-stu-btn {
  float: right;
  margin-bottom: 10px;
}
.search-area {
  display: inline-block;
  float: left;
  margin-bottom: 10px;
}
.pagination-style {
  float: right;
  margin-top: 10px;
}
</style>
