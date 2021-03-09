<template>
  <q-layout view="hHh lpR fFf">
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

    <q-drawer
      v-model="left_drawer_open"
      @mouseover="mini_state = false"
      @mouseout="mini_state = true"
      :mini="mini_state"
      :width="200"
      :breakpoint="768"
      bordered
      show-if-above
      content-class="bg-grey-1"
    >
      <q-list>
        <EssentialLink
          v-for="link in essential_links"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "World Stats",
    icon: "public",
    link: "/"
  },
  {
    title: "Country Stats",
    icon: "flag",
    link: "/countries"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      left_drawer_open: false,
      mini_state: true,
      essential_links: linksData
    };
  }
};
</script>
