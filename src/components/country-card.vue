<template>
  <q-card
    class="my-card col-5 bg-blue-grey-6 text-white q-px-md"
    style="min-width: 20em"
  >
    <q-card-section>
      <div class="text-h6">{{ country }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-subtitle2 row justify-between">
        <span>Infected:</span>
        <span>{{ infected | numWithCommas }}</span>
      </div>
      <div class="text-subtitle2 row justify-between">
        <span>Tested</span>
        <span>{{ tested | numWithCommas }}</span>
      </div>
      <div class="text-subtitle2 row justify-between">
        <span>Recovered</span>
        <span>{{ recovered | numWithCommas }}</span>
      </div>
      <div class="text-subtitle2 row justify-between">
        <span>Deceased</span>
        <span>{{ deceased | numWithCommas }}</span>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="goToHistory()">View History</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "CountryCard",
  props: {
      country: String,
      infected: Number,
      tested: Number,
      recovered: Number,
      deceased: Number,
      historyData: String
  },
  methods: {
    ...mapMutations('chart', ['setHistoryURL']),
    goToHistory() {
      this.setHistoryURL(this.historyData);
      this.$router.push('/history');
    }
  }
};
</script>

<style></style>
