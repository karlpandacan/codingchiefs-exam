<template>
  <v-row v-if="Object.keys(this.pokemon).length > 0">
    <v-col col="12" xs="12" sm="12" md="6" xl="6" lg="6">
      <Strength :types="types" />
    </v-col>
    <v-col col="12" xs="12" sm="12" md="6" xl="6" lg="6">
      <Weakness :types="types" />
    </v-col>
  </v-row>
</template>
<script>
import Strength from "./Strength";
import Weakness from "./Weakness";
export default {
  name: "pokemon-strength-and-weakness",
  components: { Strength, Weakness },
  props: {
    pokemon: {
      type: Object,
      required: true,
      deafult: () => ({}),
    },
  },
  data: () => ({
    types: [],
  }),
  methods: {
    async getTypeDetails(type) {
      await this.$http.get("/api/type/" + type).then((response) => {
        this.types.push(response.data);
      });
    },
  },
  watch: {
    pokemon() {
      if (Object.keys(this.pokemon).length > 0) {
        this.types = [];
        this.pokemon.types.forEach((elements, index) => {
          this.getTypeDetails(elements.type.name);
        });
      }
    },
  },
};
</script>
