<template>
  <div>
    <el-table
        :data="tableData.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
    >
      <el-table-column prop="change_number" label="变更单号">
        <template slot-scope="scope">
          <span style="center">{{ scope.row.change_number }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="change_name" label="变更名称">
        <template slot-scope="scope">
          <span style="center">{{ scope.row.change_name }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="request_date" label="申请时间">
        <template slot-scope="scope">
          <span style="center">{{ scope.row.request_date }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="request_man" label="处理人">
        <template slot-scope="scope">
          <span style="center">{{ scope.row.request_man }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150px">
        <el-button type="text" size="small">编辑</el-button>
        <el-button @click="downFile()" type="text" size="small">下载</el-button>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
          :current-page.sync="pageNum"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>

  import change from "../../network/models/change";
  import _axios from "../../network/axios";


  export default {
    data() {
      return {
        tableData: [],
        dialogTableVisible: false,
        currentRow: null, // 下载时传递变更单号
        pageNum: 1, //默认显示第一页
        pageSize: 5, //默认每页显示5条
        totalChange: 400
      };
    },

    methods: {
      // 下载功能函数
      downFile() {
        let repuestData = {
          change_number: this.currentRow.change_number
        };

        _axios.request({
          method: "get",
          headers: {
            "content-type":
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          },
          Authentication: {username: sessionStorage.getItem("token")},
          url: "/downfile/change/" + this.currentRow.change_number,
          responseType: "blob"
        }).then(res => {
          const blob = new Blob([res.data], {
            type: "application/zip;charset=utf-8"
          });
          const fileName = this.currentRow.change_number + ".docx"; //下载的文件名称及其后缀，后缀要和后台保持的一致
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        }).catch(function (err) {
        });
      },

      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleSizeChange(val) {
        this.pageSize = val; //动态改变
      },
      async getChange(){
        try {
          const change = await change.getChange()
          this.tableData = change
        } catch (error) {
          if (error.error_code === 10020) {
            this.tableData = []
          }
        }
      }
    },
    async created() {
      await this.getChange()
    }
  };
</script>

<style lang="scss"></style>
