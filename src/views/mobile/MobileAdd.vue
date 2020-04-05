<template>
  <div>
    <el-steps
        :active="active"
        finish-status="success"
        align-center
        style="margin-bottom: 30px;margin-top: 20px;"
    >
      <el-step title="填写基础信息"></el-step>
      <el-step title="填写操作信息"></el-step>
      <el-step title="确认信息" description></el-step>
      <el-step title="完成" description></el-step>
    </el-steps>

    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
    >
      <div v-if="active === 1" style="margin: 0 auto;align-content: center;">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="日期" prop="date1" required>
              <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.date1"
                  value-format="yyyy-MM-dd"
                  style="width: 94%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间" prop="date2" required>
              <el-time-picker
                  placeholder="选择时间"
                  v-model="ruleForm.date2"
                  value-format="HH:mm:ss"
                  :picker-options="{ selectableRange: '07:00:00 - 20:30:00' }"
                  style="width: 94%;"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="位置" prop="location_name">
              <el-select
                  v-model="ruleForm.location_name"
                  placeholder="请选择办公楼"
                  style="width: 94%;"
              >
                <el-option
                    v-for="(item, index) in region"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间" prop="room">
              <el-input
                  v-model="ruleForm.room"
                  placeholder="请输入办公室"
                  style="width: 94%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="事件类型" prop="type_name">
              <el-select
                  v-model="ruleForm.type_name"
                  placeholder="请选择类型"
                  style="width: 94%;"
              >
                <el-option
                    v-for="(pcitem, index) in pctype"
                    :key="index"
                    :label="pcitem.name"
                    :value="pcitem.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理时长" prop="process_time">
              <el-input
                  v-model="ruleForm.process_time"
                  placeholder="请输入处理时长"
                  style="width: 94%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div v-if="active === 2">
        <el-form-item label="操作系统" prop="os_name">
          <el-radio-group v-model="ruleForm.os_name">
            <el-radio
                v-for="(item, index) in ostype"
                :key="index"
                :label="item.name"
                :value="item.name"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="事件内容" prop="content">
          <el-input type="textarea" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="处理过程" prop="solution">
          <el-input type="textarea" v-model="ruleForm.solution"></el-input>
        </el-form-item>
      </div>
      <div v-if="active === 3">
        <el-card shadow="never">
          <ul>
            <li>
              <span>日期</span>
              {{ ruleForm.date1 }}
            </li>
            <li>
              <span>时间</span>
              {{ ruleForm.date2 }}
            </li>
            <li>
              <span>房间</span>
              {{ ruleForm.room }}
            </li>
            <li>
              <span>位置</span>
              {{ ruleForm.location_name }}
            </li>
            <li>
              <span>类型</span>
              {{ ruleForm.type_name }}
            </li>
          </ul>
        </el-card>
      </div>
      <div v-if="active === 4">
        <i class="el-icon-circle-check"></i>
        <el-button size="medium" @click="resetForm('ruleForm')"
        >重新提交</el-button
        >
      </div>

      <div style="margin-left: 100px;margin-top:20px">
        <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            size="medium"
            v-if="active == 3"
        >提交</el-button
        >
        <el-button size="medium" @click="next" v-if="active == 1 || active == 2"
        >下一步</el-button
        >
        <el-button size="medium" @click="prev" v-if="active == 2 || active == 3"
        >上一步</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
  import mobile from '@/network/models/mobile'

  export default {
    data() {
      return {
        active: 1,
        region: "",
        pctype: "",
        ostype: "",

        ruleForm: {
          room: "",
          location_name: "",
          date1: "",
          date2: "",
          type_name: "",
          process_time: "",
          os_name: "",
          content: "",
          solution: ""
        },
        rules: {
          room: [
            {
              required: true,
              message: "请输入房间信息",
              trigger: "blur"
            },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur"
            }
          ],
          location_name: [
            {
              required: true,
              message: "请选择位置",
              trigger: "change"
            }
          ],
          date1: [
            {
              type: "date",
              required: true,
              message: "请选择日期",
              trigger: "change"
            }
          ],
          date2: [
            {
              type: "date",
              required: true,
              message: "请选择时间",
              trigger: "change"
            }
          ],
          type_name: [
            {
              required: true,
              message: "请选择事件类型",
              trigger: "change"
            }
          ],
          process_time: [
            {
              required: true,
              message: "请输入处理时长",
              trigger: "change"
            }
          ],
          os_name: [
            {
              required: true,
              message: "请选择操作系统",
              trigger: "blur"
            }
          ]
        }
      };
    },

    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },

      async submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let repuestData = {
              date: this.ruleForm.date1,
              time: this.ruleForm.date2,
              location_name: this.ruleForm.location_name,
              room: this.ruleForm.room,
              type_name: this.ruleForm.type_name,
              process_time: this.ruleForm.process_time,
              os_name: this.ruleForm.os_name,
              content: this.ruleForm.content,
              solution: this.ruleForm.solution
            };
            //
            // await mobile.addEvent(repuestData).then(result => {
            //   this.active = 4;
            // });
          } else {
            console.log("error submit!!");
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
      async getBuild() {
        try {
          const build = await mobile.getBuild()
          this.region = build
        } catch (error) {
          if (error.error_code === 10020) {
            this.region = []
          }
        }
      },
      async getType() {
        try {
          const pctype = await mobile.getType()
          this.pctype = pctype
        } catch (error) {
          if (error.error_code === 10020) {
            this.pctype = []
          }
        }
      },
      async getOS() {
        try {
          const os = await mobile.getOS()
          this.ostype = os
        } catch (error) {
          if (error.error_code === 10020) {
            this.ostype = []
          }
        }
      },
    },

    async created() {
      await this.getBuild()
      await this.getType()
      await this.getOS()
    },

  };
</script>

<style lang="scss" scoped>
  .el-col .el-col-12 {
    height: 50px;
    padding: 0 10px;
  }

  .el-form-item__label {
    text-align: center;
    float: left;
    font-size: 14px;
    line-height: 40px;
    padding: 0 0 0 0;
  }
</style>
