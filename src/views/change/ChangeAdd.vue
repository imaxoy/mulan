<template>
  <div id="change-wrap">
    <el-steps
        :active="active"
        finish-status="success"
        align-center
        style="margin-bottom: 30px;margin-top: 20px;"
    >
      <el-step title="填写变更概况"></el-step>
      <el-step title="填写变更内容"></el-step>
      <el-step title="填写变更结果"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <el-form
        :model="ruleForm"
        :rules="rules"
        :label-position="labelPosition"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
    >
      <div v-if="active === 1" style="margin: 0 60px;align-content: center;">
        <!-- 第一行内容 -->
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="变更名称" prop="change_name">
              <el-input
                  v-model="ruleForm.change_name"
                  :size="ipheight"
                  class="changewidth"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="申请时间" prop="request_date">
              <el-date-picker
                  v-model="ruleForm.request_date"
                  type="datetime"
                  align="right"
                  placeholder="选择日期"
                  :size="ipheight"
                  class="changewidth"
                  value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行内容 -->
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="变更申请人" prop="request_man">
              <el-select
                  v-model="ruleForm.request_man"
                  filterable
                  placeholder="请选择"
                  :size="ipheight"
                  class="changewidth"
              >
                <el-option
                    v-for="item in person"
                    :key="item.id"
                    :label="item.label"
                    :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="责任单位" prop="change_department">
              <el-select
                  v-model="ruleForm.change_department"
                  filterable
                  placeholder="请选择"
                  :size="ipheight"
                  class="changewidth"
              >
                <el-option
                    v-for="item in department"
                    :key="item.index"
                    :label="item.name"
                    :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三行内容 -->
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="变更原因" prop="reason_name">
              <el-select
                  v-model="ruleForm.reason_name"
                  placeholder="请选择"
                  :size="ipheight"
                  class="changewidth"
              >
                <el-option
                    v-for="item in changereason"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="变更分类" prop="type_name">
              <el-select
                  v-model="ruleForm.type_name"
                  placeholder="请选择"
                  :size="ipheight"
                  class="changewidth"
              >
                <el-option
                    v-for="item in changetype"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第四行内容 -->
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="影响程度" prop="change_influence">
              <el-radio-group v-model="ruleForm.change_influence">
                <el-radio value="重大" label="重大" :size="ipheight">
                  <el-tag type="danger" :size="ipheight">重大</el-tag>
                </el-radio>
                <el-radio value="大" label="大">
                  <el-tag :size="ipheight">大</el-tag>
                </el-radio>
                <el-radio value="一般" label="一般">
                  <el-tag type="success" :size="ipheight">一般</el-tag>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="紧急程度" prop="change_emergency">
              <el-radio-group v-model="ruleForm.change_emergency">
                <el-radio value="紧急" label="紧急">
                  <el-tag type="danger" :size="ipheight">紧急</el-tag>
                </el-radio>
                <el-radio value="急" label="急">
                  <el-tag :size="ipheight">急</el-tag>
                </el-radio>
                <el-radio value="一般" label="一般">
                  <el-tag type="success" :size="ipheight">一般</el-tag>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div v-if="active === 2" style="margin: 0 60px;align-content: center;">
        <el-row>
          <el-col :span="24">
            <el-form-item label="变更描述" prop="change_description">
              <el-input
                  v-model="ruleForm.change_description"
                  :size="ipheight"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="变更风险" prop="change_risk">
              <el-input
                  v-model="ruleForm.change_risk"
                  :size="ipheight"
                  class="changewidth"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="涉及的设备信息" prop="change_device">
              <el-input
                  type="text"
                  v-model="ruleForm.change_device"
                  :size="ipheight"
                  class="changewidth"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="涉及的资源信息" prop="change_resource">
              <el-input
                  type="textarea"
                  :size="ipheight"
                  v-model="ruleForm.change_resource"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="变更过程" prop="change_course">
              <el-input
                  type="textarea"
                  v-model="ruleForm.change_course"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div v-if="active === 3" style="margin: 0 60px;align-content: center;">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="变更处理开始时间" prop="start_date">
              <el-date-picker
                  v-model="ruleForm.start_date"
                  type="datetime"
                  align="right"
                  placeholder="选择日期"
                  :size="ipheight"
                  class="changewidth"
                  value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变更处理结束时间" prop="end_date">
              <el-date-picker
                  v-model="ruleForm.end_date"
                  type="datetime"
                  align="right"
                  placeholder="选择日期"
                  :size="ipheight"
                  class="changewidth"
                  value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="变更执行人" prop="exec_man">
              <el-input
                  v-model="ruleForm.exec_man"
                  :size="ipheight"
                  class="changewidth"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="变更审核人" prop="owner_man">
              <el-input
                  v-model="ruleForm.owner_man"
                  :size="ipheight"
                  class="changewidth"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="测试结果" prop="change_test">
              <el-input
                  type="textarea"
                  v-model="ruleForm.change_test"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div v-if="active === 4" style="margin: 0 auto;align-content: center;">
        <i class="el-icon-circle-check"></i>
        <el-button size="medium" @click="resetForm('ruleForm')"
        >重新提交
        </el-button
        >
      </div>

      <div style="margin-left: 60px;margin-top:20px">
        <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            size="medium"
            v-if="active == 3"
        >提交
        </el-button
        >
        <el-button size="medium" @click="next" v-if="active == 1 || active == 2"
        >下一步
        </el-button
        >
        <el-button size="medium" @click="prev" v-if="active == 2 || active == 3"
        >上一步
        </el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>

  import person from "../../network/models/person";
  import change from "../../network/models/change";

  export default {
    data() {
      return {
        active: 1,
        ipheight: "small",
        labelPosition: "top",
        infradio: 3,
        emeradio: 3,
        department: "",
        changereason: "",
        changetype: "",
        person: "",
        ruleForm: {
          change_name: "",
          request_date: "",
          request_man: "",
          change_department: "",
          reason_name: "",
          type_name: "",
          change_influence: "",
          change_emergency: "",
          change_risk: "",
          change_description: "",
          change_device: "",
          change_resource: "",
          change_course: "",
          start_date: "",
          end_date: "",
          exec_man: "",
          owner_man: "",
          change_test: ""
        },
        rules: {
          change_name: [
            {required: true, message: "请输入变更名称", trigger: "blur"},
            {min: 8, max: 20, message: "长度在 8 到 20 个字符", trigger: "blur"}
          ],
          request_date: [
            {
              type: "datetime",
              message: "请选择申请日期",
              trigger: "change"
            }
          ],
          request_man: [
            {required: true, message: "请选择申请人", trigger: "blur"},
            {min: 8, max: 20, message: "长度在 8 到 20 个字符", trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let repuestData = {
              change_name: this.ruleForm.change_name,
              request_date: this.ruleForm.request_date,
              request_man: this.ruleForm.request_man,
              change_department: this.ruleForm.change_department,
              reason_name: this.ruleForm.reason_name,
              type_name: this.ruleForm.type_name,
              change_influence: this.ruleForm.change_influence,
              change_emergency: this.ruleForm.change_emergency,
              change_risk: this.ruleForm.change_risk,
              change_description: this.ruleForm.change_description,
              change_device: this.ruleForm.change_device,
              change_resource: this.ruleForm.change_resource,
              change_course: this.ruleForm.change_course,
              start_date: this.ruleForm.start_date,
              end_date: this.ruleForm.end_date,
              exec_man: this.ruleForm.exec_man,
              owner_man: this.ruleForm.owner_man,
              change_test: this.ruleForm.change_test
            };
            change.addChange(repuestData).then(result => {
              this.active = 4;
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.active = 1;
      },
      prev() {
        --this.active;
        if (this.active < 1) this.active = 1;
      },
      next() {
        if (this.active++ > 3) this.active = 1;
      },
      async getDepartment() {
        try {
          const department = await change.getDepartment()
          this.department = department
        } catch (error) {
          if (error.error_code === 10020) {
            this.department = []
          }
        }
      },
      async getReason() {
        try {
          const reason = await change.getReason()
          this.changereason = reason
        } catch (error) {
          if (error.error_code === 10020) {
            this.changereason = []
          }
        }
      },
      async getType(){
        try {
          const changetype = await change.getType()
          this.changetype = changetype
        }catch (error) {
          if (error.error_code === 10020) {
            this.changetype = []
          }
        }
      },
      async getPerson(){
        try {
          const person = await person.getPerson()
          this.person = person
        }catch (error) {
          if (error.error_code === 10020) {
            this.person = []
          }
        }
      },
    },
    async created() {
      await this.getDepartment()
      await this.getReason()
      await this.getType()
      await this.getPerson()
    }
  };
</script>

<style lang="scss" scoped>
  #change-wrap {
    border: 0px solid #dcdfe6;

    .changewidth {
      width: 100%;
    }

    .el-row {
      margin-bottom: 8px;
    }

    .el-form-item__label {
      font-size: 14px;
      color: #606266;
      line-height: 32px;
      padding: 0 12px 0 0;
    }

    .el-form-item {
      margin-bottom: 2px;
    }
  }
</style>
