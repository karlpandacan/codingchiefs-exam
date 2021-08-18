<template>
  <v-card>
    <v-container v-if="pokemon.sprites !== undefined"> </v-container>
  </v-card>
</template>
<script>
export default {
  name: "pokemon-view-about",
  props: {
    pokemon: {
      type: Object,
      required: true,
      deafult: () => ({}),
    },
  },
  data: () => ({
    flavorTextEntries: "",
  }),
  methods: {
    getFlavorTextEntries() {
        this.isLoading = true;
        this.$http
          .get("/api/pokemon-species/" + this.pokemon.id)
          .then((response) => {
          })
          .catch((error) => console.log(error))
    },
  watch: {
    pokemon() {
      if (this.pokemon.id !== undefined) {
        this.getFlavorTextEntries();
      }
    },
  }
};
</script>
