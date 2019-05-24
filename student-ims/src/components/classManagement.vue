<template>
  <div class="class-management">
    <!--顶部操作区-->
    <div class="operate-area">
      <div class="search-area">
        <el-input placeholder="请输入班级名称"
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
      <el-button class="add-class-btn"
        type="primary"
        :loading="status.rest.add"
        @click="addClass()"
        size="medium">新增班级</el-button>
    </div>
    <!--新增班级对话框-->
    <el-dialog title="新增班级"
      width="400px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="closeDialog"
      @closed="closedDialog"
      @open="openDialog">
      <div>
        <el-form label-width="7em"
          ref="ruleForm"
          :model="formData"
          :rules="rules">
          <el-col :span="24"
            style="height: 58px">
            <el-form-item label="班级名称"
              prop="className">
              <el-input size="small"
                placeholder="请输入"
                v-model="formData.className"
                :maxlength="10">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24"
            style="height: 58px">
            <el-form-item label="班级人数"
              prop="classSize">
              <el-input size="small"
                placeholder="请输入"
                v-model.number="formData.classSize">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24"
            style="height: 58px">
            <el-form-item label="班主任名称"
              prop="classTeacher">
              <el-input size="small"
                placeholder="请输入"
                v-model="formData.classTeacher"
                :maxlength="6">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <span slot="footer"
          class="dialog-footer">
          <el-button @click="cancelAdd"
            size="small">取 消</el-button>
          <el-button type="primary"
            @click="submitClass"
            size="small">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <!--班级列表-->
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
      <el-table-column label="班级名称"
        header-align="center"
        min-width="200">
        <template slot-scope="scope">
          <el-input v-if="status.onEdit[scope.$index]"
            resize="none"
            maxlength="10"
            placeholder="请输入班级名称"
            :autosize="{ minRows: 1, maxRows: 3 }"
            v-model="scope.row.className"
            @blur="validateFields('className',scope.row.className)">
          </el-input>
          <span v-else>{{scope.row.className}}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级编号"
        header-align="center"
        min-width="150"
        prop="classNo">
      </el-table-column>
      <el-table-column label="班级人数"
        header-align="center"
        min-width="150">
        <template slot-scope="scope">
          <el-input v-if="status.onEdit[scope.$index]"
            resize="none"
            placeholder="请输入班级人数"
            :autosize="{ minRows: 1, maxRows: 3 }"
            v-model.number="scope.row.classSize"
            @blur="validateFields('classSize',scope.row.classSize)">
          </el-input>
          <span v-else>{{scope.row.classSize}}</span>
        </template>
      </el-table-column>
      <el-table-column label="班主任"
        header-align="center"
        min-width="200">
        <template slot-scope="scope">
          <el-input v-if="status.onEdit[scope.$index]"
            resize="none"
            maxlength="6"
            placeholder="请输入班主任名称"
            :autosize="{ minRows: 1, maxRows: 3 }"
            v-model="scope.row.classTeacher"
            @blur="validateFields('classTeacher',scope.row.classTeacher)">
          </el-input>
          <span v-else>{{scope.row.classTeacher}}</span>
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
            @click="delClass(scope.row,scope.$index)">删除</el-button>
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
        className: null,
        classSize: null,
        classTeacher: null
      },
      rules: {
        className: [
          {
            required: true,
            message: '请输入班级名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10个字符',
            trigger: 'blur'
          }
        ],
        classSize: [
          {
            required: true,
            message: '请输入班级人数',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur'
          },
          {
            pattern: /^3\d{1}|40$/,
            message: '班级人数在30-40人之间',
            trigger: 'blur'
          }
        ],
        classTeacher: [
          {
            required: true,
            message: '请输入班级任名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 6,
            message: '长度在 2 到 6 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
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
    addClass () {
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
        .post('/api/class/list', params)
        .then(res => {
          this.pager.total = res.data.count
          this.tableData = res.data.data
          // sessionStorage['classData'] = JSON.stringify(this.tableData)
          this.tableDataCache = res.data.data.map(item => ({ ...item }))
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
    delClass (row, index) {
      this.$confirm('确认删除该班级?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.id
          }
          this.$http
            .post('/api/class/delete', params)
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
    //  更新
    updateList (row, index, onEdit) {
      if (!onEdit) {
        this.$set(this.status.onEdit, index, 1)
      } else {
        //  校验数据
        const validateRes =
          this.validateFields('className', row['className']) &&
          this.validateFields('classSize', row['classSize']) &&
          this.validateFields('classTeacher', row['classTeacher'])
        if (!validateRes) {
          return false
        }
        //  状态管理
        this.status.rest.save[index] = true

        //  提交数据
        this.$http
          .post('/api/class/update', row)
          .then(res => {
            if (res.data.code === 20000) {
              this.$message.success('更新成功!')
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
      this.tableData[index] = JSON.parse(
        JSON.stringify(this.tableDataCache[index])
      )
    },
    handleCurrentChange (val) {
      this.pager.currentPage = val
      this.getTableData(false)
    },
    submitClass () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http
            .post(`/api/class/add`, this.formData)
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
        className: null,
        classSize: null,
        classTeacher: null
      }
      this.$refs.ruleForm.resetFields()
    },
    resetStatus () {
      this.status.onEdit = []
      this.status.rest.save = []
    },
    validateFields (itemName, itemData) {
      if (itemName === 'className') {
        if (itemData.length < 2) {
          this.$message.warning('班级名称必须在2个字以上!')
          return false
        }
        return true
      }

      if (itemName === 'classSize') {
        if (itemData.length === 0) {
          this.$message.warning('请填写班级人数!')
          return false
        } else if (!/^3\d{1}|40$/.test(itemData)) {
          this.$message.warning('班级人数范围为30-40人')
          return false
        } else {
          return true
        }
      }

      if (itemName === 'classTeacher') {
        if (itemData.length < 2) {
          this.$message.warning('班主任名称必须在2个字以上!')
          return false
        }
        return true
      }
    }
  }
}
</script>
<style scoped>
.add-class-btn {
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
