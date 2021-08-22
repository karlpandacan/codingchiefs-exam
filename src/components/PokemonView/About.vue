<template>
  <v-card>
    <v-container>
      <h2>About</h2>
      <template v-if="Object.keys(this.species).length > 0">
        <p v-html="textEntries"></p>
      </template>
      <template v-else>
        <p>No Data Found</p>
      </template>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "pokemon-view-about",
  props: {
    species: {
      type: Object,
      required: true,
      deafult: () => ({}),
    },
  },
  data: () => ({
    textEntries: "",
  }),
  watch: {
    species() {
      if (Object.keys(this.species).length > 0) {
        this.textEntries = "";
        this.species.flavor_text_entries.forEach((elements, index) => {
          if (elements.language.name == "en") {
            this.textEntries += "&nbsp;" + elements.flavor_text;
          }
        });
      }
    },
  },
};
</script>
<style scoped>
h2 {
  color: #00539c;
}
</style>
