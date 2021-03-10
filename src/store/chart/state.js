export default function() {
  return {
    chartsData: {
      categories: [],
      chart: {},
      dataset: []
    },
    totalsData: {},
    rawData: [],
    selectedCountry: {
      name: null,
      historyURL: null
    },
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
