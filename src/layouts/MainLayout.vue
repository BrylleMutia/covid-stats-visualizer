<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="left_drawer_open = !left_drawer_open"
        />

        <q-toolbar-title style="font-size: 1rem">
          COVID-19 Stats Visualizer
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left_drawer_open" bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="absolute-bottom-right q-mr-lg q-mb-lg">
        <q-fab
          v-model="is_fab_open"
          vertical-actions-align="right"
          color="primary"
          icon="coronavirus"
          direction="up"
        >
          <q-fab-action
            color="primary"
            icon="coronavirus"
            label="Overall"
            @click="changeChartView(null)"
          />
          <q-fab-action
            color="infected"
            icon="coronavirus"
            label="Infected"
            @click="changeChartView('Infected')"
          />
          <q-fab-action
            color="recovered"
            icon="coronavirus"
            label="Recovered"
            @click="changeChartView('Recovered')"
          />
          <q-fab-action
            color="deceased"
            icon="coronavirus"
            label="Deceased"
            @click="changeChartView('Deceased')"
          />
        </q-fab>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapMutations } from "vuex";

const linksData = [
  {
    title: "World Stats",
    icon: "public",
    link: "/"
  },
  {
    title: "Country Stats",
    icon: "flag",
    link: "/country"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      left_drawer_open: false,
      is_fab_open: false,
      essentialLinks: linksData
    };
  },
  methods: {
    ...mapMutations("chart", ["changeChartView"])
  }
};
</script>
