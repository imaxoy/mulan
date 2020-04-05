<template>
  <div>
    <el-table :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column prop="policy_id" label="规则ID" width="120">
        <template slot-scope="scope">
          <span style="center">{{ scope.row.policy_id }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="change_name" label="规则数量" width="120">
        <template slot-scope="scope">
          <span style="center">{{ scope.row.policy_number }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="request_date" label="规则分类" width="120">
        <template slot-scope="scope">
          <span style="center">{{ scope.row.policy_type }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="request_man" label="规则描述">
        <template slot-scope="scope">
          <span style="center">{{ scope.row.policy_describe }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Policy from "@/network/models/policy";
import policy from "../../network/models/policy";

export default {
  data() {
    return {
      tableData: []
    };
  },
  methods:{
    async getPolicy() {
      try {
        const os = await policy.getPolicy()
        this.tableData = os
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
  },
  async created() {
    await this.getPolicy()
  }
};
</script>
