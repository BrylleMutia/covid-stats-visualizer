<template>
  <q-page>
    <div id="chart-container">
      <fusioncharts
        :type="type"
        :width="width"
        :height="height"
        :dataformat="dataFormat"
        :dataSource="filterByChartView"
      >
      </fusioncharts>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BarChart",
  data() {
    return {
      type: "mscolumn2d",
      renderAt: "chart-container",
      width: "100%",
      height: "100%",
      dataFormat: "json",
    };
  },
  computed: {
    ...mapState('chart', ['chartsData', 'chartType', 'chartView']),
    filterByChartView() {
      // if no view is specified, return all data
      if(!this.chartView) return this.chartsData;

      // only return data corresponding to selected view (infected/recovered/deceased)
      let viewData = this.chartsData.dataset.filter(viewName => viewName.seriesname === this.chartView);
      console.log(viewData);
      return {
        ...this.chartsData,
        dataset: viewData
      };
    }
  },
};
</script>

<style></style>
