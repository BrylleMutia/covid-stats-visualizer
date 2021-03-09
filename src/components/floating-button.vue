<template>
  <q-fab
    v-model="is_fab_open"
    vertical-actions-align="right"
    color="primary"
    icon="coronavirus"
    direction="up"
  >
    <q-fab-action
      v-for="(action, actionIndex) in fab_actions"
      :key="actionIndex"
      :color="action == 'Overall' ? 'primary' : action.toLowerCase()"
      icon="coronavirus"
      :label="action"
      @click="changeChartView(action == 'Overall' ? null : action)"
    />
  </q-fab>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: "FloatingButton",
    data() {
        return {
            is_fab_open: false,
            fab_actions: ["Overall", "Infected", "Tested", "Recovered", "Deceased"]
        }
    },
    methods: {
    ...mapMutations("chart", ["changeChartView"])
  }
}
</script>

<style></style>
