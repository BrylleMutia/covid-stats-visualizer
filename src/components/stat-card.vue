<template>
  <q-card class="my-card col-5" :class="`bg-${category} text-white q-mb-md`">
    <q-card-section>
      <div class="text-h6">{{ category | capitalize }}:</div>
      <div class="text-subtitle2">{{ count | numWithCommas }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-h6">Top 5 Countries:</div>
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
      <q-btn flat>View data</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "StatCard",
  props: {
    count: Number,
    top: Array,
    category: String
  }
};
</script>

<style></style>
