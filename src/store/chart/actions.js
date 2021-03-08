import axios from "axios";

export function fetchData({ commit }) {
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
    })
    .catch(err => console.error(err));
}