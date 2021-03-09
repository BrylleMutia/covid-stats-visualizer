// compile datasets from response to separate objects/views
const DATASET_VIEWS = [
  { barName: "infected", barColor: "#5D62B5" },
  { barName: "recovered", barColor: "#29C3BE" },
  { barName: "deceased", barColor: "#F2726F" },
  { barName: "tested", barColor: "#ffc533" },
];

const BAR_CHART_CONFIG = {
  caption: "COVID-19 Statistics per Country",
  xaxisname: "Country",
  theme: "fusion"
}

const HISTORY_CHART_CONFIG = {
  caption: "COVID-19 History",
  subCaption: "Start of pandemic - present",
  xaxisname: "Date",
  drawAnchors: false,
  connectNullData: false,
  theme: "fusion"
}

export function changeChartView(state, payload) {
  // change current category on view
  state.chartView = payload;
}

export function setSearchQuery(state, payload) {
  // change current category on view
  state.searchQuery = payload;
}

export function showLoading(state) {
  state.isLoading = true;
}
export function hideLoading(state) {
  state.isLoading = false;
}

export function setHistoryURL(state, payload) {
  state.historyURL = payload;
}

export function fetchRawData(state, responseData) {
  state.rawData = responseData;
}

export function fetchHistoryData(state, responseData) {
  // filter API data to fit data structure for chart data
  // data structure for chart can be found on fusionchart docs

  let categories = [];

  // categories
  categories[0] = { category: [] };
  for (let historyData of responseData) {
    categories[0].category.push({ label: historyData.lastUpdatedAtApify.slice(0, 10) });  // only get date
  }

  // arrange dataset from API to fit required chart data structure
  let compiledDatasets = DATASET_VIEWS.map(datasetView =>
    filterDataset(datasetView, responseData)
  );

  let historyChartData = {
    chart: HISTORY_CHART_CONFIG,
    categories,
    dataset: compiledDatasets
  };

  state.historyData = historyChartData;
}

export function fetchTotalsData(state, responseData) {
  // calculate the worldwide total data for each category (infected, tested, etc.)
  // and the top 3 countries for each category

  let totals = {
    infected: {
      category: 'infected',
      count: 0,
      top: []
    },
    tested: {
      category: 'tested',
      count: 0,
      top: []
    },
    recovered: {
      category: 'recovered',
      count: 0,
      top: []
    },
    deceased: {
      category: 'deceased',
      count: 0,
      top: []
    }
  };

  Object.keys(totals).forEach(stat => {
    totals[stat].count = responseData.reduce((totalValue, currentValue) => {
      return totalValue + currentValue[stat];
    }, 0);

    // get data for each country on current category
    let filteredCategoryData = responseData.map(countryData => ({
      country: countryData.country,
      count: countryData[stat]
    }));

    // sort the data by stat
    filteredCategoryData.sort((a, b) =>
      a.count < b.count ? 1 : a.count > b.count ? -1 : 0
    );

    totals[stat].top = filteredCategoryData;
  });

  state.totalsData = totals;
}

export function fetchChartsData(state, responseData) {
  // filter API data to fit data structure for chart data
  // data structure for chart can be found on fusionchart docs

  let categories = [];

  // categories
  categories[0] = { category: [] };
  for (let countryData of responseData) {
    categories[0].category.push({ label: countryData.country });
  }

  // arrange dataset from API to fit required chart data structure
  let compiledDatasets = DATASET_VIEWS.map(datasetView =>
    filterDataset(datasetView, responseData)
  );

  let chartsData = {
    chart: BAR_CHART_CONFIG,
    categories,
    dataset: compiledDatasets
  };

  state.chartsData = chartsData;
}

const filterDataset = ({ barName, barColor }, responseData) => {
  let dataset = {
    seriesname: barName.charAt(0).toUpperCase() + barName.slice(1), // capitalize
    data: [],
    color: barColor
  };

  for (let countryData of responseData) {
    dataset.data.push({ value: countryData[barName] });
  }

  return dataset;
};
