<template>
  <div id="pokemon-view">
    <v-container>
      <v-row>
        <v-col xs="6" sm="6" md="3" lg="3" xl="3">
          <PokemonDetails :pokemon="pokemonDetails" />
          <EvolutionDetails :species="species" />
        </v-col>
      </v-row>
    </v-container>
    <loading :is-loading="isLoading" />
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import PokemonDetails from "@/components/PokemonView/Details";
import EvolutionDetails from "@/components/PokemonView/EvolutionDetails";
export default {
  name: "pokemon-view",
  components: { Loading, PokemonDetails, EvolutionDetails },
  data: () => ({
    isLoading: false,
    showPassword: false,
    pokemonDetails: {},
    species: {},
  }),
  methods: {
    getPokemon() {
      this.isLoading = true;
      this.$http
        .get("/api/pokemon/" + this.pokemon)
        .then((response) => {
          this.pokemonDetails = response.data;
          this.getSpecies(response.data.id);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.isLoading = false));
    },
    getSpecies() {
      this.$http
        .get("/api/pokemon-species/" + this.pokemon)
        .then((response) => {
          this.species = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getPokemon();
  },
  computed: {
    pokemon() {
      return this.$route.params.pokemon;
    },
  },
};
</script>
