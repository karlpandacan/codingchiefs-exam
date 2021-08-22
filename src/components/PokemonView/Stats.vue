<template>
  <v-row v-if="Object.keys(this.pokemon).length > 0">
    <v-col
      v-for="(stat, index) in pokemon.stats"
      :key="index"
      col="12"
      xs="6"
      sm="3"
      md="2"
      xl="2"
      lg="2"
    >
      <v-card class="text-center">
        <v-card-text class="text-capitalize text-center mx-auto">
          <h2 class="text-h2">
            {{ stat.base_stat }}
          </h2>
          <span v-html="stat.stat.name.replaceAll('-', ' ')"></span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-if="species.base_happiness" col="12" xs="6" sm="3" md="2" xl="2" lg="2">
      <v-card class="text-center">
        <v-card-text class="text-capitalize text-center mx-auto">
          <h2 class="text-h2">
            {{ species.base_happiness }}
          </h2>
          <span> Happiness </span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-if="species.capture_rate" col="12" xs="6" sm="3" md="2" xl="2" lg="2">
      <v-card class="text-center">
        <v-card-text class="text-capitalize text-center mx-auto">
          <h2 class="text-h2">
            {{ species.capture_rate }}
          </h2>
          <span> Capture Rate </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "pokemon-stats",
  props: {
    pokemon: {
      type: Object,
      required: true,
      deafult: () => ({}),
    },
    species: {
      type: Object,
      required: true,
      deafult: () => ({}),
    },
  },
};
</script>
<style scoped>
h2 {
  color: #00539c;
}
</style>
