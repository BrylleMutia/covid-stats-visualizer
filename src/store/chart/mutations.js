export function fetchData(state, payload) {
  state.chartsData = payload;
}

export function changeChartView(state, payload) {
    state.chartView = payload;
}