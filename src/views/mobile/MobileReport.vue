<template>
  <div>
    <el-row :gutter="50">
      <el-col :span="12">
        <div id="totalReport" style="width: 400px;height: 300px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="typeReport" style="width: 400px;height: 300px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { GetTypeReport, GetTotalReport } from "@/api/mobile";
  import { typeData, totalData } from "@/charts/mobile";
  export default {
    data() {
      return {
        chart_total_data: [],
        chart_total_name: [],
        chart_type_data: [],
        chart_type_name: []
      };
    },
    methods: {
      drawTotal() {
        let totalChart = this.$echarts.init(
            document.getElementById("totalReport")
        );
        totalChart.setOption(totalData);

        totalChart.hideLoading(); //没有加载出来隐藏加载动画

        GetTotalReport().then(result => {
          this.chart_total_data = result.data;
          for (var i = 0; i < this.chart_total_data.length; i++) {
            this.chart_total_name.push(this.chart_total_data[i].name);
          }
          totalChart.setOption({
            //动画的配置
            legend: {
              data: this.chart_total_name
            },
            series: [
              {
                data: this.chart_total_data //这里数据是一个数组的形似
              }
            ]
          });
        });
      },
      drawType() {
        let typeChart = this.$echarts.init(document.getElementById("typeReport"));
        typeChart.setOption(typeData);

        typeChart.hideLoading(); //没有加载出来隐藏加载动画

        GetTypeReport().then(result => {
          this.chart_type_data = result.data;
          console.log(this.chart_type_data);
          for (var i = 0; i < this.chart_type_data.length; i++) {
            this.chart_type_name.push(this.chart_type_data[i].name);
          }
          typeChart.setOption({
            //动画的配置
            legend: {
              data: this.chart_type_name
            },
            series: [
              {
                data: this.chart_type_data //这里数据是一个数组的形似
              }
            ]
          });
        });
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.drawTotal();
        this.drawType();
      });
    }
  };
</script>

<style lang="scss" scoped></style>
