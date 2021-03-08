<template>
  <q-page padding class="flex flex-center">
    <main class="fit">
      <div class="row full-width justify-center flex-gap-2">
        <stat-card
          v-for="(totalData, index) of totalsData"
          v-bind="totalData"
          :key="index"
        />
      </div>
    </main>
  </q-page>
</template>

<script>
import StatCard from "../components/stat-card.vue";
import { mapState } from "vuex";

export default {
  name: "PageIndex",
  components: {
    StatCard
  },
  computed: {
    ...mapState("chart", ["totalsData"])
  },
};
</script>
