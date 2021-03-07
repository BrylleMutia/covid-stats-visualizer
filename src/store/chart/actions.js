import axios from "axios";

export function fetchData({ commit }) {
  axios
    .get(
      "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
    )
    .then(response => {
      // filter API data to fit data structure for chart data
      // data structure for chart can be found on fusionchart docs

      let categories = [];

      // categories
      categories[0] = { category: [] };
      for (let countryData of response.data) {
        categories[0].category.push({ label: countryData.country });
      }

      // compile datasets from response to separate objects/views
      const datasetViews = [
        { barName: "infected" },
        { barName: "recovered" },
        { barName: "deceased" }
      ];
      
      let compiledDatasets = datasetViews.map(datasetView =>
        filterDataset(datasetView, response.data)
      );

      let chartsData = {
        chart: {
          caption: "COVID-19 Statistics per Country",
          xaxisname: "Country",
          theme: "fusion"
        },
        categories,
        dataset: compiledDatasets
      };

      commit("fetchData", chartsData);
    })
    .catch(err => console.error(err));
}

function filterDataset({ barName, barColor }, responseData) {
  let dataset = {
    seriesname: barName.charAt(0).toUpperCase() + barName.slice(1), // capitalize
    data: [],
    color: barColor
  };
  for (let countryData of responseData) {
    dataset.data.push({ value: countryData[barName] });
  }
  return dataset;
}
