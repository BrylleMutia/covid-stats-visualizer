<template>
  <q-inner-loading :showing="isLoading">
    <q-spinner-facebook size="xl" color="primary" />
  </q-inner-loading>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Loader",
    computed: {
        ...mapState('chart', ['isLoading'])
    }
};
</script>

<style></style>
