<template>
  <v-dialog v-model="show" persistent max-width="280">
    <v-card color="secondary">
      <v-card-text color="primary">
        Please stand by
        <v-progress-linear
          indeterminate
          color="primary"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "loading",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      deafult: false,
    },
  },
  computed: {
    show() {
      return this.isLoading;
    },
  },
};
</script> 