<template>
  <v-card>
    <v-container v-if="Object.keys(this.pokemon).length > 0">
      <h2>Moves</h2>
      <p class="text-capitalize" v-html="moves"></p>
      <!-- <p v-if="moves == ''"> No Data Found </p> -->
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "pokemon-view-moves",
  props: {
    pokemon: {
      type: Object,
      required: true,
      deafult: () => ({}),
    },
  },
  data: () => ({
    moves: "",
  }),
  watch: {
    pokemon() {
      if (Object.keys(this.pokemon).length > 0) {
        this.moves = "";
        let movesLenth = this.pokemon.moves.length;
        this.pokemon.moves.forEach((elements, index) => {
          this.moves += "&nbsp;" + elements.move.name.replaceAll("-", " ");
          if (index + 1 < movesLenth) {
              this.moves += ", "
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
