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

}
</script>

<style>

</style>