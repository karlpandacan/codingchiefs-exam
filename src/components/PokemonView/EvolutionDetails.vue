<template>
  <v-card>
    <v-container v-if="Object.keys(this.species).length > 0">
      <v-row>
        <v-col col="12">
          <v-card-title class="text-xl-center">Evolution</v-card-title>
        </v-col>
      </v-row>
      <v-row
        ><v-col cols="12">
          <v-timeline align-top dense>
            <v-timeline-item
              class="text-capitalize"
              fill-dot
              v-for="(evolution, index) in evolutions"
              :key="index"
            >
              {{ evolution.name }}
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "pokemon-evolution-details",
  props: {
    species: {
      type: Object,
      required: true,
      deafult: () => ({}),
    },
  },
  data: () => ({
    evolutions: [],
  }),
  methods: {
    getEvolutions() {
      this.evolutions = [];
      let evolutionChainId = this.species.evolution_chain.url.replace(
        this.$api + "/evolution-chain/",
        ""
      );
      this.isLoading = true;
      this.$http.get("/api/evolution-chain/" + evolutionChainId).then((response) => {
        this.evolutions.push(response.data.chain.species);
        let evolvesTo = response.data.chain.evolves_to;
        while (evolvesTo.length > 0) {
          this.evolutions.push(evolvesTo[0].species);
          if (evolvesTo[0].evolves_to.length !== undefined)
            evolvesTo = evolvesTo[0].evolves_to;
        }
      });
    },
  },
  watch: {
    species() {
      if (Object.keys(this.species).length > 0) {
        this.getEvolutions();
      }
    },
  },
};
</script>
