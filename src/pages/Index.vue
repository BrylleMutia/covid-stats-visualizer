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

      <loader />
    </main>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import StatCard from "../components/stat-card.vue";
import Loader from "../components/loader.vue";


export default {
  name: "PageIndex",
  components: {
    StatCard,
    Loader
  },
  computed: {
    ...mapState("chart", ["totalsData"])
  },
};
</script>
