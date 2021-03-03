// import something here
import VueFusionCharts from "vue-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Vue from "vue";

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);
