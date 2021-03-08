<template>
  <q-card class="my-card col-5" :class="`bg-${category} text-white q-px-md`" style="min-width: 20em">
    <q-card-section class="row justify-between items-end">
      <div class="text-h6">{{ category | capitalize }}:</div>
      <div class="statistics-count">{{ count | numWithCommas }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div
        class="text-subtitle2 row justify-between"
        v-for="(countryData, index) in top.slice(0, 5)"
        :key="index"
      >
        <span>{{ countryData.country }}</span>
        <span>{{ countryData.count | numWithCommas }}</span>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="redirectToView(category)">View data</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "StatCard",
  props: {
    count: Number,
    top: Array,
    category: String
  },
  methods: {
    ...mapMutations("chart", ["changeChartView"]),
    redirectToView(category) {
      let upperCategory = this.$options.filters.capitalize(category);

      this.changeChartView(upperCategory);
      this.$router.push('/bar');
    }
  }
};
</script>

<style></style>
