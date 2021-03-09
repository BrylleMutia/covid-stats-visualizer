import axios from "axios";

export function fetchData({ commit }) {
  commit("showLoading");

  axios
    .get(
      "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
    )
    .then(response => {
      // replace NA to zero
      let newData = response.data.map(countryData => {
        Object.keys(countryData).forEach(countryStat => {
          if (countryData[countryStat] === "NA") countryData[countryStat] = 0;
        });

        return countryData;
      });

      commit("fetchChartsData", newData);
      commit("fetchTotalsData", newData);
      commit("fetchRawData", newData);

      commit("hideLoading");
    })
    .catch(err => console.error(err));
}

export function fetchHistoryData({ commit }, historyURL) {
  commit("showLoading");

  axios.get(historyURL).then(response => {
    // replace NA to zero
    let newData = response.data.map(historyData => {
      Object.keys(historyData).forEach(historyStat => {
        if (historyData[historyStat] === "N/A") historyData[historyStat] = 0;
      });

      return historyData;
    });

    commit("fetchHistoryData", newData);

    commit("hideLoading");
  });
}
