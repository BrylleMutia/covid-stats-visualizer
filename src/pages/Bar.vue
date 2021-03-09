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

    <div class="absolute-bottom-right q-mr-lg q-mb-lg">
      <floating-button />
    </div>

    <loader />
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import FloatingButton from "../components/floating-button.vue";
import Loader from "../components/loader.vue";


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
  components: {
    FloatingButton,
    Loader
  },
  computed: {
    ...mapState("chart", ["chartsData", "chartType", "chartView"]),
    filterByChartView() {
      // if no view is specified, return all data
      // exclude testing for now, bc it has big values, for better comparison
      if (!this.chartView)
        return {
          ...this.chartsData,
          dataset: this.chartsData.dataset.filter(
            data => data.seriesname !== "Tested"
          )
        };

      // only return data corresponding to selected view (infected/recovered/deceased)
      let viewData = this.chartsData.dataset.filter(
        viewName => viewName.seriesname === this.chartView
      );

      return {
        ...this.chartsData,
        dataset: viewData
      };
    }
  },
  
};
</script>

<style></style>
