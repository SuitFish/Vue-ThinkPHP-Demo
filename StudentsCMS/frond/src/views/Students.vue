<template>
  <el-container>
    <el-container>
      <el-main>
        <el-button
            type="primary"
            @click="adddialogVisible = true"
            style="margin-left: 10%">
          添加
        </el-button>
        <el-input
            style="width: 200px; margin-left: 50px ;"
            placeholder="请输入姓名"
            clearable
            v-model="param.key">
        </el-input>
        <el-button
            type="primary"
            @click="search"
            style="margin-left: 10px"
            icon="el-icon-search">
          搜索
        </el-button>

        <!--          表格-->
        <el-table :data="tableData">
          <el-table-column prop="name" label="姓名">
          </el-table-column>

          <el-table-column prop="sex" label="性别">
          </el-table-column>

          <el-table-column prop="age" label="年龄">
          </el-table-column>

          <el-table-column prop="hobbyName" label="爱好">
          </el-table-column>

          <el-table-column prop="summary" label="简介">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
              <el-popconfirm
                  confirm-button-text='好的'
                  cancel-button-text='不用了'
                  icon="el-icon-info"
                  icon-color="red"
                  title="这是一段内容确定删除吗？"
                  @confirm="del(scope.row.id)"
                  placement="right"
              >
                <el-button slot="reference" type="danger" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!--          分页-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="param.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!--          添加表单-->
        <el-dialog
            title="添加"
            :visible.sync="adddialogVisible"
            width="40%">
                    <span>
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="姓名">
                            <el-input v-model="form.name"></el-input>
                            </el-form-item>

                            <el-form-item label="年龄">
                            <el-input v-model="form.age"></el-input>
                            </el-form-item>

                            <el-form-item label="性别">
                            <el-radio-group v-model="form.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                            </el-form-item>

                            <el-form-item label="爱好" prop="hobbyName">
                            <el-checkbox-group v-model="hobbyName">
                                <el-checkbox v-for="hobby in hobbyOptions" @change="hobbyListToStr" :label="hobby"
                                             :key="hobby">{{ hobby }}</el-checkbox>
                            </el-checkbox-group>
                            </el-form-item>

                            <el-form-item label="简介">
                            <el-input autosize v-model="form.summary"></el-input>
                            </el-form-item>

                        </el-form>
                        </span>
          <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="addSave()">保存</el-button>
                        <el-button @click="adddialogVisible = false">取消</el-button>
                    </span>
        </el-dialog>
        <!--          编辑表单-->
        <el-dialog
            title="编辑"
            :visible.sync="editdialogVisible"
            width="40%">
                    <span>
                        <el-form ref="form" :model="editForm" label-width="80px">
                            <el-form-item label="姓名">
                                <el-input v-model="editForm.name"></el-input>
                            </el-form-item>

                            <el-form-item label="年龄">
                              <el-input v-model="editForm.age"></el-input>
                            </el-form-item>

                            <el-form-item label="性别">
                              <el-radio-group v-model="editForm.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                              </el-radio-group>
                            </el-form-item>

                        <el-form-item label="爱好" prop="hobbyName">
                          <el-checkbox-group v-model="editForm.hobbyName">
                            <el-checkbox v-for="hobby in hobbyOptions" :label="hobby" :key="hobby">{{
                                hobby
                              }}</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>

                        <el-form-item label="简介">
                          <el-input type="text" autosize v-model="editForm.summary"></el-input>
                        </el-form-item>

                        </el-form>
                    </span>
          <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="editsave()">修改</el-button>
                      <el-button @click="editdialogVisible = false">取消</el-button>
                    </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
const hobbyOptions = ['篮球', '游泳', '羽毛球', '跑步'];
export default {
  data() {
    return {
      param: {
        key: '',
        page: 1,
        limit: 10,
      },
      tableData: [],
      currentPage: 1,
      total: 5,

      adddialogVisible: false,
      hobbyName: [],
      hobbyOptions,
      form: {
        name: '',
        sex: '',
        age: '',
        hobbyName: [''],
        summary: ''
      },
      editdialogVisible: false,
      editForm: {
        name: '',
        sex: '',
        age: '',
        hobbyName: [''],
        summary: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.param.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.param.page = val
      this.getList()
    },
    search() {

      this.getList()
    },
    hobbyListToStr() {
      this.form.hobbyName = this.hobbyName.join(",")
    },
    async getList() {
      const {data: res} = await this.$ajax.get('http://localhost/index.php/Index/index/index', {params: this.param})
      this.tableData = res.data
      this.total = res.total
    },
    async del(id) {
      const {data: res} = await this.$ajax.post('http://localhost/index.php/Index/index/delete', {id: id})
      if (res.code == 1) {
        this.$msg.success(res.msg)
        await this.getList()
      } else {
        this.$msg.error(res.msg)
      }
    },
    async addSave() {
      const {data: res} = await this.$ajax.get('http://localhost/index.php/Index/index/save', {params: this.form})
      this.adddialogVisible = false
      if (res.code == 1) {
        this.$msg.success(res.msg)
        this.getList()
      } else {
        this.$msg.error(res.msg)
      }
    },
    edit(info) {
      this.editdialogVisible = true
      this.editForm.id = info.id
      this.editForm.name = info.name
      this.editForm.sex = info.sex
      this.editForm.age = info.age
      this.editForm.hobbyName = info.hobbyName.split(',')
      this.editForm.summary = info.summary
    },
    async editsave() {
      this.editForm.hobbyName = this.editForm.hobbyName.join(",")
      const {data: res} = await this.$ajax.post('http://localhost/index.php/Index/index/save', this.editForm)
      this.editdialogVisible = false
      if (res.code == 1) {
        this.$msg.success(res.msg)
        this.getList()
      } else {
        this.$msg.error(res.msg)
      }
    },

  }
}
</script>

<style scoped>
.el-container {

}

.el-pagination {
  margin-top: 30px;
  margin-left: 10%;
}

.el-table {
  width: 80%;
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
