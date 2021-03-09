export default function() {
  return {
    chartsData: {
      categories: [],
      chart: {},
      dataset: []
    },
    totalsData: {},
    rawData: [],
    historyURL: null,
    historyData: {
      categories: [],
      chart: {},
      dataset: []
    },
    chartType: null,
    chartView: null,
    searchQuery: null,
    isLoading: false
  };
}
