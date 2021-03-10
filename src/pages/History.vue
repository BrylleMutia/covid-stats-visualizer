<template>
  <q-page>
    <section>
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
    </section>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import FloatingButton from "../components/floating-button.vue";
import Loader from "../components/loader.vue";

export default {
  name: "History",
  data() {
    return {
      type: "msline",
      renderAt: "chart-container",
      width: "100%",
      height: "100%",
      dataFormat: "json"
    };
  },
  components: {
    FloatingButton,
    Loader
  },
  computed: {
    ...mapState("chart", ["selectedCountry", "historyData", 'chartView']),
    filterByChartView() {
      // if no view is specified, return all data
      // exclude testing for now, bc it has big values, for better comparison
      if (!this.chartView) 
        return {
          ...this.historyData,
          dataset: this.historyData.dataset.filter(
            data => data.seriesname !== "Tested"
          )
        };

      // only return data corresponding to selected view (infected/recovered/deceased)
      let viewData = this.historyData.dataset.filter(
        viewName => viewName.seriesname === this.chartView
      );

      return {
        ...this.historyData,
        dataset: viewData
      };
    }
  },
  methods: {
    ...mapActions("chart", ["fetchHistoryData"]),
    ...mapMutations('chart', ['changeChartView'])
  },
  mounted() {
    this.fetchHistoryData(this.selectedCountry.historyURL);

    // reset view
    this.changeChartView(null);
  }
};
</script>

<style></style>
