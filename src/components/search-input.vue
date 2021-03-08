<template>
  <q-input
    v-model="search_query"
    outlined
    type="search"
    clearable
    @input="setSearchQuery(search_query)"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "SearchInput",
  data() {
    return {
      search_query: null
    };
  },
  methods: {
    ...mapMutations("chart", ["setSearchQuery"])
  }
};
</script>

<style></style>
