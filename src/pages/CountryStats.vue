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

      <loader />
    </main>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import CountryCard from "../components/country-card.vue";
import SearchInput from "../components/search-input.vue";
import Loader from "../components/loader.vue";

export default {
  name: "History",
  data() {
    return {
      search_query: null
    };
  },
  components: {
    CountryCard,
    SearchInput,
    Loader
  },
  methods: {
    showNotif() {
      this.$q.notify({
        message: "A 0 (zero) stat means that it's either unrecorded or no record at all.",
        color: 'primary',
        type: "info"
      })
    }
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
  },
  mounted() {
    this.showNotif();
  }
};
</script>

<style></style>
