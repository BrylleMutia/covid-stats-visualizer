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
      <q-fab
        v-model="is_fab_open"
        vertical-actions-align="right"
        color="primary"
        icon="coronavirus"
        direction="up"
      >
        <q-fab-action
          v-for="(action, actionIndex) in fab_actions"
          :key="actionIndex"
          :color="action == 'Overall' ? 'primary' : action.toLowerCase()"
          icon="coronavirus"
          :label="action"
          @click="changeChartView(action == 'Overall' ? null : action)"
        />
      </q-fab>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BarChart",
  data() {
    return {
      type: "mscolumn2d",
      renderAt: "chart-container",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      is_fab_open: false,
      fab_actions: ["Overall", "Infected", "Tested", "Recovered", "Deceased"]
    };
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
  methods: {
    ...mapMutations("chart", ["changeChartView"])
  }
};
</script>

<style></style>
