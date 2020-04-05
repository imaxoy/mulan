<template>
  <div>
    <el-table
        :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
        style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="日期">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="时间">
              <span>{{ props.row.time }}</span>
            </el-form-item>
            <el-form-item label="人员">
              <span>{{ props.row.person }}</span>
            </el-form-item>
            <el-form-item label="位置">
              <span>{{ props.row.build }}</span>
            </el-form-item>
            <el-form-item label="事件类型">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="操作系统">
              <span>{{ props.row.os }}</span>
            </el-form-item>
            <el-form-item label="处理时长">
              <span>{{ props.row.pctime }}</span>
            </el-form-item>
            <el-form-item label="事件内容">
              <span>{{ props.row.content }}</span>
            </el-form-item>
            <el-form-item label="处理过程">
              <span>{{ props.row.solution }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          v-for="(item, index) in tableData.date"
          :key="index"
      ></el-table-column>
      <el-table-column label="日期" prop="date"> </el-table-column>
      <el-table-column label="时间" prop="time"> </el-table-column>
      <el-table-column label="人员" prop="person"> </el-table-column>
      <el-table-column label="位置" prop="build"> </el-table-column>
      <el-table-column label="类型" prop="type"> </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalEvent"
      >>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { CatEvent } from "@/api/mobile";

  export default {
    data() {
      return {
        tableData: [
          {
            date: "",
            time: "",
            build: "",
            type: "",
            pctime: "",
            os: "",
            person: ""
          }
        ],
        currentPage: 1, //默认显示第一页
        pageSize: 6, //默认每页显示10条
        totalNum: 0, //总页数
        totalEvent: 0
      };
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val; //动态改变
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val; //动态改变
      }
    },
    async created() {
      this.totalNum = this.tableData.length;

      CatEvent().then(result => {
        this.tableData = result.data;
        this.totalEvent = result.data.length;
      });
    }
  };
</script>

<style lang="scss" scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
