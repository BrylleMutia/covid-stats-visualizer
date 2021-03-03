<template>
  <div id="chart-container">
    <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataformat="dataFormat"
      :dataSource="dataSource"
    >
    </fusioncharts>
  </div>
</template>

<script>
// const categories = [
//   {
//     category: [
//       {
//         label: "Q1"
//       },
//       {
//         label: "Q2"
//       },
//       {
//         label: "Q3"
//       },
//       {
//         label: "Q4"
//       }
//     ]
//   }
// ];

// const dataset = [
//   {
//     seriesname: "Previous Year",
//     data: [
//       {
//         value: "12000"
//       },
//       {
//         value: "10500"
//       },
//       {
//         value: "23500"
//       },
//       {
//         value: "16000"
//       }
//     ]
//   },
//   {
//     seriesname: "Current Year",
//     data: [
//       {
//         value: "24400"
//       },
//       {
//         value: "29800"
//       },
//       {
//         value: "20800"
//       },
//       {
//         value: "26800"
//       }
//     ]
//   }
// ];

export default {
  name: "BarChart",
  data() {
    return {
      type: "mscolumn2d",
      renderAt: "chart-container",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "COVID-19 Statistics per Country",
          xaxisname: "Country",
          theme: "fusion"
        },
        categories: [],
        dataset: []
      }
    };
  },
  mounted() {
    this.$axios
      .get(
        "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
      )
      .then(response => {
        // filter API data to fit data structure for chart data

        // categories
        let categories = [];
        categories[0] = { category: [] };
        for (let countryData of response.data) {
          categories[0]["category"].push({ label: countryData.country });
        }

        // infected per country
        let dataset = [];
        dataset[0] = { seriesname: "Infected", data: [] };
        for (let countryData of response.data) {
            dataset[0]["data"].push({ value: countryData.infected });
        }

        // recovered per country
        dataset[1] = { seriesname: "Recovered", data: [] };
        for (let countryData of response.data) {
            dataset[1]["data"].push({ value: countryData.recovered });
        }

        // deceased per country
        dataset[2] = { seriesname: "Deceased", data: [] };
        for (let countryData of response.data) {
            dataset[2]["data"].push({ value: countryData.deceased });
        }

        this.dataSource.categories = categories;
        this.dataSource.dataset = dataset;
      });
  }
};
</script>

<style></style>
