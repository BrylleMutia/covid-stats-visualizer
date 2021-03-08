<template>
  <q-page padding class="flex justify-start">
    <main class="fit column items-center">
      <search-input class="q-mb-lg" />
      <div class="row full-width justify-center flex-gap-2">
        <country-card
          v-for="(countryData, index) in filterCountriesBySearch"
          :key="index"
          v-bind="countryData"
        />
      </div>
    </main>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import CountryCard from "../components/country-card.vue";
import SearchInput from "../components/search-input.vue";

export default {
  name: "History",
  data() {
    return {
      search_query: null
    };
  },
  components: {
    CountryCard,
    SearchInput
  },
  computed: {
    ...mapState("chart", ["rawData", "searchQuery"]),
    filterCountriesBySearch() {
      if (!this.searchQuery) return this.rawData;

      // return countries relevant to search
      return this.rawData.filter(countryData => {
        let foundMatch = countryData.country
          .toLowerCase()
          .search(this.searchQuery.toLowerCase());
        if (foundMatch !== -1) return countryData;
      });
    }
  }
};
</script>

<style></style>
